-- Default admin: username=admin  password=Admin@2026
INSERT INTO admin_users (username, password_hash)
SELECT 'admin', '$2y$10$4qdaZGIyEL7AsnKwMEr4GuVQyyCATf3rVGLfrIpM6pLV.jcilIwKC'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE username = 'admin');
