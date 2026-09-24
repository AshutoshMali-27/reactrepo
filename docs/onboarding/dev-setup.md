# Dev setup

## Prerequisites

- Node.js (a version compatible with Vite 8 / TypeScript ~6 — use a current LTS)
- Access to a running instance of the backend API this frontend talks to (not part of this repo)

## Install

```bash
npm install
```

## Configure

Copy `.env` and point it at your backend:

```bash
# .env.local (create this — .env is not currently gitignored, see docs/specs/security.md)
VITE_API_URL='https://localhost:7017/api/'
VITE_API_TIMEOUT=30000
```

`VITE_API_TIMEOUT` is currently defined but not read anywhere in code — the effective timeout is the `5000`ms hardcoded in `src/api/axios.ts`. If you need a longer timeout, change it there (or wire the env var in, consistently).

The backend must:

- Serve on the URL in `VITE_API_URL`
- Set a session cookie on login and accept it on subsequent requests (`withCredentials: true` on the frontend)
- Allow CORS with credentials from your dev origin (typically `http://localhost:5173`) — a wildcard `Access-Control-Allow-Origin` will not work with credentialed requests

## Run

```bash
npm run dev
```

Vite will print the local URL (default `http://localhost:5173`). You'll land on `/login` since every other route is protected.

## Common gotchas

- **CORS/cookie errors in the console**: almost always the backend not echoing back a specific origin + `Access-Control-Allow-Credentials: true`, not a frontend bug. See [troubleshooting.md](troubleshooting.md).
- **Env var not showing up in `import.meta.env`**: it must be prefixed `VITE_`, and you must restart the dev server after changing `.env` (Vite doesn't hot-reload env changes).
- **`.env` vs `.env.local`**: `.env` is checked in (not gitignored today); prefer `.env.local` for anything you don't want to accidentally commit, and it will override `.env`.

## Build & preview

```bash
npm run build     # tsc -b && vite build
npm run preview   # serve the production build locally
```
