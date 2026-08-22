# Theory Test Practice

A full-stack web app for practicing the Israeli driving theory exam. Learners take mock tests in the real exam format, study by topic, and get follow-up questions targeted at their weak spots.

**Live site:** [theory-test.vercel.app](https://theory-test.vercel.app/)

The product is an independent study tool. It is not affiliated with the Israeli Ministry of Transport or the Licensing Authority.

---

## Highlights

- **Adaptive practice** — per-question stats (accuracy, recency) drive selection: mastered items are skipped, weak items are oversampled (~50% of a focused quiz), remaining slots are random `$sample` from MongoDB.
- **Exam-faithful UX** — 30-question mock exams, category filters, license-class tagging (B / A / C / C1 / D / tractor), option shuffling, timed sessions, and post-attempt review.
- **Hebrew-first UI** — RTL layout, legal pages (privacy, terms, accessibility), and an in-app accessibility widget (font scale, contrast, reduced motion).
- **Production-minded API** — Helmet, explicit CORS allowlist, bcrypt password hashes, signed JWTs, rate-limited auth and password-reset endpoints, fail-fast env validation (no silent defaults).

---

## Architecture

```
┌─────────────────────────┐          ┌──────────────────────────────┐
│  React SPA (Vite)       │  HTTPS   │  Express API                 │
│  TypeScript             │ ──────── │  TypeScript (ESM)            │
│  styled-components      │  /api/*  │  Helmet · CORS · rate-limit  │
│  React Router           │          │  JWT (users + admin)         │
│  Vercel                 │          │  Nodemailer (password reset) │
└─────────────────────────┘          └──────────────┬───────────────┘
                                                    │
                                                    ▼
                                         MongoDB (Mongoose)
                                         users · questions · sessions
                                         attempts · per-question stats
                                         support tickets
```

The client is a static SPA. In local development Vite proxies `/api` to the Express server. In production the SPA is hosted on Vercel; the API is a long-running Node process (Render / Railway / Fly — not Vercel serverless, because the server uses `app.listen`).

Question text and images come from the official public dataset on [data.gov.il](https://data.gov.il/). A parser (`parseOfficialTheoryXml`) and a tagging script map license classes from the source XML into MongoDB. The bank itself is **not** committed to this repository.

---

## Stack

| Layer | Technology |
|--------|------------|
| Client | React 18, TypeScript, Vite 5, React Router 6, styled-components |
| Server | Node.js, Express 4, TypeScript (ESM), `tsx` in development |
| Data | MongoDB, Mongoose 8 |
| Auth | JWT (`jsonwebtoken`), bcrypt, optional SMTP via Nodemailer |
| Security | Helmet, CORS origin allowlist, `express-rate-limit` |
| Analytics | `@vercel/analytics` |

---

## Product surface

| Area | What it does |
|------|----------------|
| Public landing | SEO-oriented home page, guest demo quiz, FAQ — no account required |
| Auth | Register / login, forgot-password (hashed one-time token, 1-hour TTL), `/me` |
| Practice | Configurable quiz length & category, weak-spot mode, image-free mode |
| Learning | Topic study and a matching game |
| Progress | Personal stats from `UserQuestionStat` + completed attempts |
| Support | In-app tickets stored in MongoDB |
| Admin | Dashboard (users, tickets, aggregate stats), JWT-gated, user deletion with cascade |
| Legal | Privacy, terms, accessibility statement; WCAG-oriented controls in the UI |

---

## Repository layout

```
client/                 Vite + React SPA
  src/api.ts            Typed fetch client
  src/components/       Screens, quiz, admin, legal, a11y widget
server/
  src/index.ts          Express bootstrap, Helmet, CORS, routers
  src/config.ts         Required env — process exits if a key is missing
  src/routes/           auth · api · admin
  src/models/           Mongoose schemas
  src/services/         Quiz picker, stats, JWT, mail, XML parser
  src/middleware/auth.ts
  scripts/              Official XML → license-type tagging
```

---

## Local development

**Prerequisites:** Node.js 20+, a running MongoDB instance with a populated `questions` collection.

```bash
# API
cp server/.env.example server/.env   # fill every required variable
cd server && npm install && npm run dev

# SPA (new terminal)
cd client && npm install && npm run dev
```

Vite serves the UI (typically `http://localhost:5173`) and proxies `/api` to `http://127.0.0.1:4000`. For a split deployment, set `VITE_API_BASE_URL` on the client (no trailing slash).

Required server variables (see `server/.env.example`):

`PORT`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_DAYS`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `CORS_ORIGINS`, `ATTEMPT_EXPIRE_AFTER_SECONDS`

Optional: `CLIENT_APP_URL`, SMTP (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, …). Without SMTP, password-reset links are written to the server log.

Never commit `.env` files. Only `*.example` templates are tracked.

---

## Contact

For collaboration, freelance work, or other inquiries:

**Tamar Amar** — [amtamar747@gmail.com](mailto:amtamar747@gmail.com)
