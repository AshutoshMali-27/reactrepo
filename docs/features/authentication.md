# Feature: Authentication

## Overview

Cookie-session login/logout, plus a "current user" query used both to render user info and to gate protected routes. No signup, no password reset, no MFA.

## User stories

- As an operator, I want to log in with a username and password, so that I can access the admin area.
- As an operator, I want to be redirected to `/login` if my session is invalid, so that I never see protected data unauthenticated.
- As an operator, I want to log out, so that my session ends and cached user data is cleared.

## UI / pages

- Route: `/login` (public, outside `<ProtectedRoute />`)
- Page: `src/features/auth/pages/Login.tsx` — renders `LoginForm`, navigates to `/` on success
- Component: `src/features/auth/component/LoginForm.tsx` — `react-hook-form`, required-field validation only (`auth.validation.ts`)

## API endpoints

Defined in `src/features/auth/auth.endpoints.ts`:

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `Login/login` | Authenticate, establishes session cookie |
| POST | `/Login/logout` | End session |
| GET | `Login/me` | Return current authenticated user |

All requests go through the shared axios instance with `withCredentials: true`, so the session is a cookie, not a token stored client-side.

## Data model

From `src/features/auth/types.ts`:

- `LoginRequests` — `{ userName, password }`
- `LoginResponse` — `{ userId, userName, email, roleId, roleName }`
- `User` — a broader shape (`userID`, `email`, `phoneNumber`, `roleID`) that appears unused by the current auth flow — check before relying on it.

## State / query keys

`src/features/auth/queryKeys.ts` — `AUTH_QUERY_KEYS.CURRENT_USER = ["auth", "current-user"]`.

- `useCurrentUser()` — `useQuery`, `retry: false` (so a 401 fails fast instead of retrying)
- `useLogin()` — `useMutation`; on success, seeds `AUTH_QUERY_KEYS.CURRENT_USER` directly via `setQueryData` (no extra round trip to `Login/me`)
- `useLogout()` — `useMutation`; on success, `removeQueries` for `CURRENT_USER`

## Edge cases & error states

- Failed login: `LoginForm` shows a generic "Login failed. Please check your credentials." alert on `loginMutation.isError` — no field-specific server error mapping.
- `ProtectedRoute` treats `isLoading` as a blocking "Loading..." render, and `isError || !data` as "redirect to `/login`, preserving `location` in `state.from`" — note `state.from` is currently not read anywhere on successful login, so users aren't returned to the page they were trying to reach.

## Out of scope

Signup, password reset, MFA, role-based UI gating, "remember me," session refresh/renewal handling beyond what the backend cookie does implicitly.

## Open questions

- Should `state.from` be used to redirect back after login?
- Is `User` in `types.ts` meant to replace `LoginResponse`, or are they genuinely different shapes from different endpoints?
