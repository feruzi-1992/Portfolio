# Database — Portfolio (MySQL / MariaDB)

Database name: `portfolio`

## Main file (from local XAMPP)

| File | Purpose |
|------|---------|
| **`portfolio.sql`** | **Full backup from local hosting** — CREATE DATABASE + tables + data |

Import:

```bash
/Applications/XAMPP/xamppfiles/bin/mysql -u root < database/portfolio.sql
```

Or phpMyAdmin → Import → `database/portfolio.sql`.

## Other helpers

| File | Purpose |
|------|---------|
| `portfolio_dump.sql` | Previous dump copy |
| `portfolio_schema.sql` | Structure only |
| `portfolio_seed.sql` | Settings + admin seed |
| `schema.sql` | Lightweight create + seed |
| `admin_seed.sql` | Admin user only |

## Default admin

- Username: `admin`
- Password: `Admin@2026`

## API config

See `api/config.php` (XAMPP: user `root`, empty password, host `127.0.0.1`).
