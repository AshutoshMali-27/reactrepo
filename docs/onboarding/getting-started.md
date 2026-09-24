# Getting started

A tour of the codebase for a new contributor, after you've done the [dev setup](dev-setup.md).

## The mental model

This is a thin admin UI over a REST backend. There are two features today:

- **`auth`** (`src/features/auth/`) — login, logout, "who am I." Read [docs/features/authentication.md](../features/authentication.md).
- **`users`** (`src/features/users/`) — list/add/edit users, with role and branch lookups. Read [docs/features/user-management.md](../features/user-management.md).

Every feature follows the same shape: endpoints → service → hooks (React Query) → components/pages. Trace one full slice before writing new code — e.g. follow `useLogin` from `LoginForm.tsx` → `hooks/useLogin.ts` → `auth.services.ts` → `api/client.ts` → `api/axios.ts`.

## Where to make a change

| I want to... | Start here |
| --- | --- |
| Add a field to the user form | `src/features/users/Components/UserForm.tsx`, `types.ts`, `endpoints.ts`/`services.ts` if the backend contract changes |
| Add a new page/route | `src/routes/router.tsx`, plus a new `pages/` component in the relevant feature |
| Add a new feature entirely | Copy the shape described in [CONVENTIONS.md](../CONVENTIONS.md); use `/new-feature` (see `.claude/commands/new-feature.md`) as a guided checklist |
| Change what happens on a 401 | `src/api/interceptor.ts` |
| Change React Query cache defaults | `src/api/queryClient.ts` |
| Understand what's already broken/incomplete | [docs/PRD.md](../PRD.md)'s scope table, and the "known gaps"/"open questions" sections scattered through [docs/features/](../features/) and [docs/specs/](../specs/) |

## Reading order

1. [docs/ARCHITECTURE.md](../ARCHITECTURE.md) — the folder structure and data flow
2. [docs/CONVENTIONS.md](../CONVENTIONS.md) — how to write new code that fits
3. [docs/features/authentication.md](../features/authentication.md) and [docs/features/user-management.md](../features/user-management.md) — what exists today
4. [docs/specs/api-design.md](../specs/api-design.md) — the HTTP layer in detail, once you're touching it

## Before you open a PR

- `npm run lint` clean
- Manually exercised the change in the browser (`npm run dev`) — see [docs/TESTING.md](../TESTING.md), there's no automated suite yet
- Checked whether your change touches a documented "known gap" or "open question" — if so, either resolve it or explicitly note you're leaving it as-is
