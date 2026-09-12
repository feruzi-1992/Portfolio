-- Portfolio database schema (run anytime; safe IF NOT EXISTS)

CREATE DATABASE IF NOT EXISTS portfolio
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  ip_address VARCHAR(45) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_sessions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  admin_id INT UNSIGNED NOT NULL,
  token CHAR(64) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_admin_sessions_user
    FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default settings (WhatsApp float ON)
INSERT INTO site_settings (setting_key, setting_value) VALUES
  ('whatsapp_float_enabled', '1'),
  ('whatsapp_number', '255658489683'),
  ('whatsapp_message', 'Habari Developer Feruzi, ninahitaji WhatsApp AI Chatbot / software help.'),
  ('chatbot_cta_enabled', '1'),
  ('help_rail_enabled', '1'),
  ('demo_promo_enabled', '1'),
  ('demo_url', 'https://primosoft.co.tz/register'),
  ('site_title', 'Portfolio · Mohammed Feruzi'),
  ('page_home_enabled', '1'),
  ('page_about_enabled', '1'),
  ('page_skills_enabled', '1'),
  ('page_services_enabled', '1'),
  ('page_process_enabled', '1'),
  ('page_projects_enabled', '1'),
  ('page_experience_enabled', '1'),
  ('page_contact_enabled', '1'),
  ('home_content', '{"eyebrow":"Portfolio · Mohammed Feruzi","headline":"Building Digital Experiences That Solve Real Problems.","subtitle":"I am Mohammed Feruzi, a full-stack software developer specializing in modern web applications, business systems, APIs, and scalable software solutions for organizations and businesses.","ctaPrimary":"View My Work","ctaSecondary":"Let\'s Work Together","exploreLabel":"Explore","imageAlt":"Abstract layered software architecture visual","trustIndicators":["WhatsApp AI Chatbot","Software Development","SaaS Architecture","Business Systems","API Development"]}')
ON DUPLICATE KEY UPDATE setting_key = setting_key;

-- Default admin: username=admin  password=Admin@2026
INSERT INTO admin_users (username, password_hash)
SELECT 'admin', '$2y$10$4qdaZGIyEL7AsnKwMEr4GuVQyyCATf3rVGLfrIpM6pLV.jcilIwKC'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE username = 'admin');
