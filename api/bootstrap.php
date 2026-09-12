<?php
declare(strict_types=1);

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $config = require __DIR__ . '/config.php';
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        $config['db_host'],
        $config['db_name'],
        $config['db_charset']
    );

    $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    return $pdo;
}

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload);
    exit;
}

function apply_cors(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = [
        'http://127.0.0.1',
        'http://localhost',
        'http://127.0.0.1:5173',
        'http://localhost:5173',
    ];

    if ($origin !== '') {
        foreach ($allowed as $prefix) {
            if (str_starts_with($origin, $prefix)) {
                header('Access-Control-Allow-Origin: ' . $origin);
                header('Vary: Origin');
                header('Access-Control-Allow-Credentials: true');
                break;
            }
        }
    }

    header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '{}', true);
    return is_array($data) ? $data : [];
}

function get_bearer_token(): ?string
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/Bearer\s+(\S+)/i', $header, $m)) {
        return $m[1];
    }
    return null;
}

function require_admin(): array
{
    $token = get_bearer_token();
    if (!$token) {
        json_response(['success' => false, 'message' => 'Unauthorized'], 401);
    }

    $stmt = db()->prepare(
        'SELECT s.token, s.expires_at, u.id, u.username
         FROM admin_sessions s
         INNER JOIN admin_users u ON u.id = s.admin_id
         WHERE s.token = :token
         LIMIT 1'
    );
    $stmt->execute([':token' => $token]);
    $row = $stmt->fetch();

    if (!$row || strtotime($row['expires_at']) < time()) {
        json_response(['success' => false, 'message' => 'Session expired'], 401);
    }

    return $row;
}

function get_all_settings(): array
{
    $rows = db()->query('SELECT setting_key, setting_value FROM site_settings')->fetchAll();
    $out = [];
    foreach ($rows as $row) {
        $out[$row['setting_key']] = $row['setting_value'];
    }
    return $out;
}

function upsert_setting(string $key, string $value): void
{
    $stmt = db()->prepare(
        'INSERT INTO site_settings (setting_key, setting_value)
         VALUES (:k, :v)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)'
    );
    $stmt->execute([':k' => $key, ':v' => $value]);
}

function default_home_content(): array
{
    return [
        'eyebrow' => 'Portfolio · Mohammed Feruzi',
        'headline' => 'Building Digital Experiences That Solve Real Problems.',
        'subtitle' => 'I am Mohammed Feruzi, a full-stack software developer specializing in modern web applications, business systems, APIs, and scalable software solutions for organizations and businesses.',
        'ctaPrimary' => 'View My Work',
        'ctaSecondary' => "Let's Work Together",
        'exploreLabel' => 'Explore',
        'imageAlt' => 'Mohammed Feruzi — Software Developer',
        'portraitUrl' => '',
        'trustIndicators' => [
            'WhatsApp AI Chatbot',
            'Software Development',
            'SaaS Architecture',
            'Business Systems',
            'API Development',
        ],
    ];
}

function normalize_home_content(mixed $raw): array
{
    $defaults = default_home_content();
    $data = [];

    if (is_string($raw) && $raw !== '') {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    } elseif (is_array($raw)) {
        $data = $raw;
    }

    $trust = $defaults['trustIndicators'];
    if (isset($data['trustIndicators'])) {
        if (is_string($data['trustIndicators'])) {
            $lines = preg_split('/\r\n|\r|\n/', $data['trustIndicators']) ?: [];
            $trust = array_values(array_filter(array_map('trim', $lines), static fn ($v) => $v !== ''));
        } elseif (is_array($data['trustIndicators'])) {
            $trust = array_values(array_filter(array_map(
                static fn ($v) => trim((string) $v),
                $data['trustIndicators']
            ), static fn ($v) => $v !== ''));
        }
        if ($trust === []) {
            $trust = $defaults['trustIndicators'];
        }
    }

    $str = static function (string $key) use ($data, $defaults): string {
        $value = trim((string) ($data[$key] ?? $defaults[$key]));
        return $value !== '' ? $value : (string) $defaults[$key];
    };

    $portrait = trim((string) ($data['portraitUrl'] ?? $defaults['portraitUrl']));
    if ($portrait !== '' && !filter_var($portrait, FILTER_VALIDATE_URL) && !str_starts_with($portrait, '/')) {
        $portrait = (string) $defaults['portraitUrl'];
    }

    return [
        'eyebrow' => $str('eyebrow'),
        'headline' => $str('headline'),
        'subtitle' => $str('subtitle'),
        'ctaPrimary' => $str('ctaPrimary'),
        'ctaSecondary' => $str('ctaSecondary'),
        'exploreLabel' => $str('exploreLabel'),
        'imageAlt' => $str('imageAlt'),
        'portraitUrl' => $portrait,
        'trustIndicators' => $trust,
    ];
}

