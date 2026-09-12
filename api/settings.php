<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
apply_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

$settings = get_all_settings();

function flag(array $settings, string $key, string $default = '1'): bool
{
    return ($settings[$key] ?? $default) === '1';
}

json_response([
    'success' => true,
    'settings' => [
        'whatsapp_float_enabled' => flag($settings, 'whatsapp_float_enabled', '0'),
        'whatsapp_number' => $settings['whatsapp_number'] ?? '',
        'whatsapp_message' => $settings['whatsapp_message'] ?? '',
        'chatbot_cta_enabled' => flag($settings, 'chatbot_cta_enabled', '0'),
        'help_rail_enabled' => flag($settings, 'help_rail_enabled', '1'),
        'demo_promo_enabled' => flag($settings, 'demo_promo_enabled', '1'),
        'demo_url' => $settings['demo_url'] ?? 'https://primosoft.co.tz/register',
        'site_title' => $settings['site_title'] ?? 'Portfolio',
        'page_home_enabled' => flag($settings, 'page_home_enabled', '1'),
        'page_about_enabled' => flag($settings, 'page_about_enabled', '1'),
        'page_skills_enabled' => flag($settings, 'page_skills_enabled', '1'),
        'page_services_enabled' => flag($settings, 'page_services_enabled', '1'),
        'page_process_enabled' => flag($settings, 'page_process_enabled', '1'),
        'page_projects_enabled' => flag($settings, 'page_projects_enabled', '1'),
        'page_experience_enabled' => flag($settings, 'page_experience_enabled', '1'),
        'page_contact_enabled' => flag($settings, 'page_contact_enabled', '1'),
        'home_content' => normalize_home_content($settings['home_content'] ?? null),
    ],
]);
