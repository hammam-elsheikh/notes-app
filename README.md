# Notes 2.0 (Full Stack)

This project has two apps:

- `backend` (Express API)
- `frontend` (React + Vite)

A root workspace setup is included so both can run together with one command.

## Project Structure

```text
part2/notes2.0/
  backend/
  frontend/
  package.json
```

## Run Locally

Run these commands from `part2/notes2.0` (not from the repository root):

```bash
npm install
npm run install:all
npm run dev
```

What this starts:

- Backend: `http://localhost:3001`
- Frontend: `http://localhost:5173`

## Available Root Scripts

From `part2/notes2.0/package.json`:

- `npm run install:all` installs dependencies in both `backend` and `frontend`
- `npm run dev` runs backend + frontend together
- `npm run dev:backend` runs only backend
- `npm run dev:frontend` runs only frontend

## API URL Configuration

Frontend API base URL is in `frontend/src/services/notes.js`:

```js
const baseUrl = import.meta.env.VITE_API_URL || "/api/notes";
```

- Local full-stack dev uses Vite proxy (`/api` -> `http://localhost:3001`)
- Deployed frontend can use `VITE_API_URL` environment variable

Example env file:

```bash
frontend/.env.example
```

Set `VITE_API_URL` only if your backend is hosted on a different URL.

## Deploy To CodeSandbox

1. Push this repository to GitHub.
2. In CodeSandbox, create a sandbox/project from the GitHub repo.
3. Open folder `part2/notes2.0`.
4. Run:

```bash
npm install
npm run install:all
npm run dev
```

5. Open the frontend preview URL (port `5173`).

Notes:

- Backend is configured with `app.listen(PORT, "0.0.0.0", ...)` for cloud/container environments.
- If frontend and backend are in the same sandbox, no `VITE_API_URL` is required.
- If frontend is separate, set `VITE_API_URL` to your backend endpoint, for example:

```bash
VITE_API_URL=https://your-backend-domain.com/api/notes
```

## Troubleshooting

- Error: `npm error Missing script: "dev"`
  - You are likely in the wrong directory.
  - Run `npm run dev` from `part2/notes2.0`, not from the repo root.

- CORS errors in deployed environments
  - Ensure your backend CORS settings allow the frontend origin.
