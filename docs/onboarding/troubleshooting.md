# Troubleshooting

## Stuck redirecting to `/login` even with correct credentials

`ProtectedRoute` redirects whenever `useCurrentUser()` returns `isError || !data`. Check, in order:

1. Is the login request itself succeeding? Look for `[REQUEST] POST Login/login` in the console (logged by `interceptor.ts`) and check the network tab for the response status.
2. Is the session cookie actually being set? Check the response's `Set-Cookie` header and the browser's cookie jar for the API's domain. If it's missing, that's a backend CORS/cookie-config issue, not frontend.
3. Is `GET Login/me` (`useCurrentUser`) sending the cookie back? If `withCredentials` isn't honored (usually a CORS misconfiguration on the backend — missing `Access-Control-Allow-Credentials: true` or a wildcard origin), the cookie won't be sent cross-origin.

## CORS errors in the console

The frontend sends `withCredentials: true` on every request (`src/api/axios.ts`). If the backend responds with `Access-Control-Allow-Origin: *`, the browser will reject the credentialed request — it must echo back the exact request origin. This is a backend config fix, not something to work around in the frontend.

## "Network Error" / requests timing out

The axios instance has a hardcoded `timeout: 5000` (`src/api/axios.ts`) — a slow backend (e.g. cold-starting locally) can trip this even when it would eventually succeed. Check the backend is actually reachable at `VITE_API_URL` first; if it's just slow, that timeout is the next thing to look at (note: `VITE_API_TIMEOUT` in `.env` is currently unused — see [dev-setup.md](dev-setup.md)).

## Changes to `.env` not taking effect

Vite reads env files at server start, not on every request. Restart `npm run dev` after editing `.env`/`.env.local`.

## TypeScript build fails but `npm run dev` looked fine

`npm run dev` doesn't type-check as strictly/at all in the way `npm run build`'s `tsc -b` does. Run `tsc -b` (or `npm run build`) before assuming a change is done — Vite dev server will happily serve code with type errors.

## A mutation succeeded but the list didn't update

Check the mutation's `onSuccess` actually invalidates (or seeds) the right query key from `queryKeys.ts` — see [docs/specs/state-management.md](../specs/state-management.md). A common mistake is invalidating a differently-shaped key literal instead of importing the shared constant.

## User list shows stale data after switching tabs back

Expected — `refetchOnWindowFocus: false` is a deliberate default in `src/api/queryClient.ts`, not a bug. If a specific query needs to always be fresh, override it on that query, don't change the global default.
