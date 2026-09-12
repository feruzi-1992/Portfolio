<?php
declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';
apply_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

$admin = require_admin();
$token = get_bearer_token();

$stmt = db()->prepare('DELETE FROM admin_sessions WHERE token = :token');
$stmt->execute([':token' => $token]);

json_response(['success' => true, 'message' => 'Logged out', 'admin' => $admin['username']]);
