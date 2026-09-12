<?php
declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';
apply_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

require_admin();

$stmt = db()->query(
    'SELECT id, name, email, subject, message, ip_address, created_at
     FROM contact_messages
     ORDER BY created_at DESC
     LIMIT 100'
);

json_response([
    'success' => true,
    'messages' => $stmt->fetchAll(),
]);
