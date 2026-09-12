# Database — Portfolio (MySQL / MariaDB)

Database name: `portfolio`

## Files

| File | Purpose |
|------|---------|
| `portfolio_dump.sql` | **Full backup** — database + tables + data (settings, admin, messages) |
| `portfolio_schema.sql` | Structure only (tables) |
| `portfolio_seed.sql` | Default `site_settings` + `admin_users` |
| `schema.sql` | Lightweight create + seed (older helper) |
| `admin_seed.sql` | Admin user seed only |

## Import (XAMPP)

Start Apache + MySQL, then:

```bash
# Full restore (recommended when cloning this repo)
/Applications/XAMPP/xamppfiles/bin/mysql -u root < database/portfolio_dump.sql
```

Or via phpMyAdmin: Import → choose `database/portfolio_dump.sql`.

## Default admin

- Username: `admin`
- Password: `Admin@2026`

Change this password after first login in production.

## API config

See `api/config.php` (XAMPP defaults: user `root`, empty password, host `127.0.0.1`).
