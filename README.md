# PrimoSoftware Portfolio

Professional developer portfolio for **Mohammed Feruzi** / **PrimoSoftware**.

Built with React, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion, and Lucide icons.

## Overview

A production-ready, responsive, SEO-friendly personal portfolio focused on SaaS platforms, web applications, and business management systems.

## Features

- Sticky responsive navbar with dark/light mode
- Hero, About, Skills, Services, Process, Projects, Experience, and Contact pages
- WhatsApp AI floating button controlled from Admin Front Control
- Admin panel for WhatsApp button, chatbot CTA, and contact messages
- Project filtering and detail modal
- Central configuration via `src/lib/siteConfig.ts` and `.env`
- Accessible forms, keyboard navigation, and `prefers-reduced-motion` support
- GitHub Pages deployment workflow

## Technology Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router (HashRouter for GitHub Pages)
- Framer Motion
- Lucide React
- PHP + MySQL (XAMPP API + admin)

## Installation

```bash
npm install
```

Copy environment defaults:

```bash
cp .env.example .env
```

Fill in optional values:

- `VITE_EMAIL`
- `VITE_PHONE`
- `VITE_GITHUB_URL`
- `VITE_LINKEDIN_URL`
- `VITE_LOCATION`
- `VITE_CV_URL`

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## XAMPP Local Hosting

Database name: `portfolio`

1. Start **Apache** and **MySQL** in XAMPP.
2. Import the database (full dump from local hosting):

```bash
/Applications/XAMPP/xamppfiles/bin/mysql -u root < database/portfolio.sql
```

Or import `database/portfolio.sql` via phpMyAdmin.  
See `database/README.md` for other options.

3. Build for XAMPP:

```bash
npm run build:xampp
```

4. Open:

- Website: http://127.0.0.1/Portfolio/dist/
- CV: http://127.0.0.1/Portfolio/dist/cv.html
- API: http://127.0.0.1/Portfolio/api/settings.php
- Admin: http://127.0.0.1/Portfolio/dist/#/admin/login

Contact form messages are stored in `portfolio.contact_messages`.

### Admin Front Control

URL: http://127.0.0.1/Portfolio/dist/#/admin/login

Default login:

- Username: `admin`
- Password: `Admin@2026`

Change the password in production by updating `admin_users.password_hash`.

Admin can control WhatsApp / help rail, page visibility, Home content, and view messages.

PHP DB config: `api/config.php` (default XAMPP user `root`, empty password).

## GitHub repository

https://github.com/feruzi-1992/Portfolio.git

```bash
git clone https://github.com/feruzi-1992/Portfolio.git
cd Portfolio
npm install
cp .env.example .env
# import database/portfolio_dump.sql into MySQL
npm run build:xampp
```

## GitHub Pages Deployment


1. Enable GitHub Pages using **GitHub Actions** as the source.
2. Push to `main` or `master` — the workflow in `.github/workflows/deploy.yml` builds and deploys `dist`.
3. The app uses `HashRouter` so deep links work on static hosting.
4. Adjust `VITE_BASE_PATH` in the workflow if your repository name differs.

Local example:

```bash
VITE_BASE_PATH=/Portfolio/ npm run build
```

## Project Structure

```text
src/
├── components/
├── sections/
├── data/
├── pages/
├── hooks/
├── lib/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

## Configuration

Edit:

- `src/lib/siteConfig.ts` — brand and SEO defaults
- `src/data/projects.ts` — projects
- `src/data/skills.ts` — skills and technology stack
- `src/data/services.ts` — services
- `src/data/experience.ts` — experience timeline

Do not invent contact details, statistics, or project URLs. Leave placeholders empty until real values are available.

## License

© 2026 PrimoSoftware. All rights reserved.
