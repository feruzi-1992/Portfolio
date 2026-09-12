<?php
declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';
apply_cors();

$admin = require_admin();

function flag(array $settings, string $key, string $default = '1'): bool
{
    return ($settings[$key] ?? $default) === '1';
}

function format_settings(array $settings): array
{
    return [
        'whatsapp_float_enabled' => flag($settings, 'whatsapp_float_enabled', '0'),
        'whatsapp_number' => $settings['whatsapp_number'] ?? '',
        'whatsapp_message' => $settings['whatsapp_message'] ?? '',
        'chatbot_cta_enabled' => flag($settings, 'chatbot_cta_enabled', '0'),
        'help_rail_enabled' => flag($settings, 'help_rail_enabled', '1'),
        'demo_promo_enabled' => flag($settings, 'demo_promo_enabled', '1'),
        'demo_url' => $settings['demo_url'] ?? 'https://primosoft.co.tz/register',
        'site_title' => $settings['site_title'] ?? '',
        'page_home_enabled' => flag($settings, 'page_home_enabled', '1'),
        'page_about_enabled' => flag($settings, 'page_about_enabled', '1'),
        'page_skills_enabled' => flag($settings, 'page_skills_enabled', '1'),
        'page_services_enabled' => flag($settings, 'page_services_enabled', '1'),
        'page_process_enabled' => flag($settings, 'page_process_enabled', '1'),
        'page_projects_enabled' => flag($settings, 'page_projects_enabled', '1'),
        'page_experience_enabled' => flag($settings, 'page_experience_enabled', '1'),
        'page_contact_enabled' => flag($settings, 'page_contact_enabled', '1'),
        'home_content' => normalize_home_content($settings['home_content'] ?? null),
    ];
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $settings = get_all_settings();
    json_response([
        'success' => true,
        'admin' => ['id' => (int) $admin['id'], 'username' => $admin['username']],
        'settings' => format_settings($settings),
    ]);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT' || $_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = read_json_body();

    $boolKeys = [
        'whatsapp_float_enabled',
        'chatbot_cta_enabled',
        'help_rail_enabled',
        'demo_promo_enabled',
        'page_home_enabled',
        'page_about_enabled',
        'page_skills_enabled',
        'page_services_enabled',
        'page_process_enabled',
        'page_projects_enabled',
        'page_experience_enabled',
        'page_contact_enabled',
    ];

    foreach ($boolKeys as $key) {
        if (array_key_exists($key, $data)) {
            upsert_setting($key, ((bool) $data[$key]) ? '1' : '0');
        }
    }

    if (isset($data['whatsapp_number'])) {
        upsert_setting('whatsapp_number', preg_replace('/\D+/', '', (string) $data['whatsapp_number']));
    }
    if (isset($data['whatsapp_message'])) {
        upsert_setting('whatsapp_message', trim((string) $data['whatsapp_message']));
    }
    if (isset($data['demo_url'])) {
        upsert_setting('demo_url', trim((string) $data['demo_url']));
    }
    if (isset($data['site_title'])) {
        upsert_setting('site_title', trim((string) $data['site_title']));
    }

    if (array_key_exists('home_content', $data)) {
        $home = normalize_home_content($data['home_content']);
        upsert_setting('home_content', json_encode($home, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    }

    $settings = get_all_settings();
    json_response([
        'success' => true,
        'message' => 'Settings saved',
        'settings' => format_settings($settings),
    ]);
}

json_response(['success' => false, 'message' => 'Method not allowed'], 405);
