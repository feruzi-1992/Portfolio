<?php
declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';
apply_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

$data = read_json_body();
$username = trim((string) ($data['username'] ?? ''));
$password = (string) ($data['password'] ?? '');

if ($username === '' || $password === '') {
    json_response(['success' => false, 'message' => 'Username and password required'], 422);
}

$stmt = db()->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = :u LIMIT 1');
$stmt->execute([':u' => $username]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    json_response(['success' => false, 'message' => 'Invalid credentials'], 401);
}

$token = bin2hex(random_bytes(32));
$expires = (new DateTimeImmutable('+7 days'))->format('Y-m-d H:i:s');

$insert = db()->prepare(
    'INSERT INTO admin_sessions (admin_id, token, expires_at) VALUES (:id, :token, :expires)'
);
$insert->execute([
    ':id' => $user['id'],
    ':token' => $token,
    ':expires' => $expires,
]);

json_response([
    'success' => true,
    'token' => $token,
    'expires_at' => $expires,
    'admin' => ['id' => (int) $user['id'], 'username' => $user['username']],
]);
