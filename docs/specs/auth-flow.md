# Auth flow

## Mechanism

Session-cookie based, not token-based. Nothing in the codebase reads/writes a token to `localStorage`/`sessionStorage`/memory. The axios instance sets `withCredentials: true`, so the browser sends and receives the session cookie automatically on every request to `VITE_API_URL`.

This means:

- The backend must set the cookie with appropriate `SameSite`/`Secure`/`HttpOnly` attributes — the frontend has no control over or visibility into this.
- CORS on the backend must explicitly allow credentials (`Access-Control-Allow-Credentials: true`) and cannot use a wildcard `Access-Control-Allow-Origin`.
- There is no CSRF token handling in the frontend. If the backend doesn't independently mitigate CSRF (e.g. `SameSite=Strict/Lax` cookies, custom header checks), cookie-based sessions without CSRF protection are a real risk — see [security.md](security.md).

## Flow

```
1. User submits LoginForm → useLogin() → AuthService.login() → POST Login/login
2. Backend sets session cookie, returns ApiResponse<LoginResponse>
3. useLogin.onSuccess seeds AUTH_QUERY_KEYS.CURRENT_USER with the response — no extra GET
4. Login page navigates to "/"
5. ProtectedRoute (on every protected route) calls useCurrentUser() → GET Login/me
   - loading  → render "Loading..."
   - success  → render <Outlet />
   - error/no data → <Navigate to="/login" state={{ from: location }} />
6. Logout: useLogout() → POST /Login/logout → removeQueries(CURRENT_USER) on success
```

## Session freshness

`useCurrentUser` has `staleTime` inherited from the global default (5 minutes) and `refetchOnMount: false` globally — meaning after the first successful check, the app will not proactively re-verify the session on every route change within that window. A session that's revoked server-side mid-window won't be caught until the next mutation triggers a 401, or `staleTime` elapses and a refetch happens.

## What's not handled

- No redirect-back-to-original-page after login (`state.from` is captured but unused).
- No silent session refresh / token renewal.
- No handling of a 401 received mid-session from a non-auth request (e.g. a `useUsers()` call failing with 401 doesn't currently force a redirect to `/login` — only `ProtectedRoute`'s own `useCurrentUser()` check does that, and only on navigation/remount).

If "session expires while I'm using the app" needs to hard-redirect to `/login`, that requires either a global response-interceptor hook (in `interceptor.ts`) that reacts to 401s, or invalidating `CURRENT_USER` from the response interceptor so `ProtectedRoute` re-evaluates.
