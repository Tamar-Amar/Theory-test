# Theory practice - developer guide

Full-stack app: **Node** (Express + MongoDB + JWT) and **React** (Vite + TypeScript + styled-components).  
Questions are stored in MongoDB (`questions` collection). RTL UI for Hebrew learners.

---

## Quick start (local)

1. **MongoDB** running and populated with questions (see `server/src/models/Question.ts`).
2. **Server** (`server/`): copy `server/.env.example` → `server/.env`, fill every variable, then:
   ```bash
   cd server && npm install && npm run dev
   ```
3. **Client** (`client/`): optional `client/.env` with `VITE_API_BASE_URL` if the API is not proxied; for local dev the Vite proxy sends `/api` to `http://127.0.0.1:4000`.
   ```bash
   cd client && npm install && npm run dev
   ```

---

## Repository layout

| Path | Role |
|------|------|
| `server/src` | REST API, Mongoose models, JWT auth, quiz session & stats |
| `client/src` | React app, components, theme, `api.ts` |

---

## Environment variables

The server **does not inject defaults** for required keys: if something is missing, the process exits with an error.

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | Yes | HTTP port (number), e.g. `4000` |
| `MONGODB_URI` or `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret for signing JWTs (long random string) |
| `JWT_EXPIRES_DAYS` | Yes | Token lifetime in days (number), e.g. `14` |
| `ADMIN_USERNAME` | Yes | Admin login username |
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `CORS_ORIGINS` | Yes | Allowed browser origins, comma-separated (no spaces around URLs) |
| `ATTEMPT_EXPIRE_AFTER_SECONDS` | Yes | `0` = no TTL; positive = Mongo TTL on attempts (seconds) |

See `server/.env.example` for a template.

### Client (`VITE_*`)

| Variable | When needed | Description |
|----------|-------------|-------------|
| `VITE_API_BASE_URL` | Production / split domains | Public base URL of the API, **no trailing slash**, e.g. `https://api.example.com`. Empty = requests go to the same origin as the site (`/api/...`). |

---

## Vercel - what to set in Environment Variables

Use **two Vercel projects** (recommended): one for the client, one for the API **or** host the API on Render/Fly/Railway and only put the client on Vercel.

### 1) Frontend project (root directory: `client`)

| Name | Value |
|------|--------|
| `VITE_API_BASE_URL` | Full URL of your API, e.g. `https://your-api.onrender.com` (no `/` at the end) |

**Build settings (typical):**

- Framework preset: Vite  
- Root directory: `client`  
- Build command: `npm run build`  
- Output directory: `dist`  

`VITE_*` variables are baked in at **build time** - after changing them, trigger a **new deployment**.

### 2) Backend project (only if the API is deployed on Vercel)

Add **all** server variables from the table above, for example:

| Name | Notes |
|------|--------|
| `PORT` | Often `3000` or whatever your host expects; Vercel may override via `process.env.PORT` |
| `MONGODB_URI` | Atlas or other hosted MongoDB |
| `JWT_SECRET` | Strong random secret |
| `JWT_EXPIRES_DAYS` | e.g. `14` |
| `ADMIN_USERNAME` | Your admin user |
| `ADMIN_PASSWORD` | Strong password |
| `CORS_ORIGINS` | Must include your live frontend, e.g. `https://your-app.vercel.app` |
| `ATTEMPT_EXPIRE_AFTER_SECONDS` | Usually `0` |

**Important:** This repo runs a classic Express server (`app.listen`). Vercel is built for static sites and serverless functions. For the API, many teams use **Render / Railway / Fly.io** instead; then only the **client** project on Vercel needs `VITE_API_BASE_URL` pointing at that API URL.

---

## Server reference (`server/src`)

| Area | Role |
|------|------|
| `routes/auth.ts` | Register, login, `/me` |
| `routes/api.ts` | Meta, quiz sessions, attempts, tickets, stats |
| `routes/admin.ts` | Admin stats, user deletion |
| `middleware/auth.ts` | JWT verification |
| `services/quizPick.ts` | Question selection (weak areas + random) |
| `services/userStats.ts` | Per-question stats after each answer |
| `models/` | User, Question, QuizSession, Attempt, UserQuestionStat, SupportTicket |

---

## License

Private project unless you add a license file.
