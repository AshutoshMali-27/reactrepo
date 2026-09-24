# Security

Frontend-side notes only — most of the actual security posture (session cookie attributes, CORS, backend authorization) lives in the backend repo and isn't visible here. This doc covers what the frontend controls and what it should flag for backend review.

## Current state

- **Session**: cookie-based via `withCredentials: true` (see [auth-flow.md](auth-flow.md)). No token is ever stored in `localStorage`/`sessionStorage` — good, avoids XSS-exfiltration of a bearer token. But CSRF protection is entirely the backend's responsibility right now; the frontend sends no CSRF token or custom header that a backend could check for "this came from our own frontend."
- **Authorization**: `ProtectedRoute` only checks "is there a valid session" — there is no role-based gating in the UI. Anyone who can authenticate sees every screen and action. If roles (`roleID`/`roleId`, already present on `User`/`LoginResponse`) are meant to restrict access, that's not implemented yet.
- **Logging**: `interceptor.ts` `console.log`s every request method/URL and specific error statuses. This is fine in dev; **should be stripped or gated behind `import.meta.env.DEV` before a production build**, since it's currently unconditional.
- **Secrets/config**: `.env` holds `VITE_API_URL` and `VITE_API_TIMEOUT` — not secrets, but note `.env` is **not** in `.gitignore` (only `*.local` is ignored). Fine while it only holds a public API URL; if a real secret is ever added to `.env` (it shouldn't be — `VITE_*` vars are bundled into the client JS and are public regardless of gitignore), it would also get committed. Keep secrets out of any `VITE_*` variable entirely; they're visible in the shipped bundle no matter what.
- **Input validation**: form-level only (`react-hook-form` required-field rules; an unused `zod` schema in `users/validation.ts`). The frontend does not sanitize input — trust the backend to validate/sanitize independently; never treat frontend validation as a security boundary.

## Checklist for new features

- Don't add anything sensitive to `VITE_*` env vars.
- Don't store tokens/PII in `localStorage`/`sessionStorage` unless there's a specific, reviewed reason.
- Route any new page needing auth through `<ProtectedRoute />`; don't build a parallel gating mechanism.
- If adding role-based UI, model it explicitly (e.g. a `useCurrentUser().data.roleName` check) rather than assuming route protection is enough.
- Keep `console.log`/`console.error` out of interceptors and services in a way that would leak request/response bodies in production.
