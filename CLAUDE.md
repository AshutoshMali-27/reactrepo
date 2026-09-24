# CLAUDE.md

This file is loaded into every Claude Code session in this repo. Keep it short and load-bearing — deep detail belongs in [docs/](docs/).

## What this is

`learnapp` is a React + TypeScript admin frontend (Vite build) for a backend REST API. Today it has two features: cookie-session **auth** (login/logout/current user) and **user management** (CRUD on users, plus roles/branches lookups). See [docs/PRD.md](docs/PRD.md) for product intent.

## Stack

- React 19, TypeScript, Vite
- `react-router-dom` v7 (`createBrowserRouter`)
- `@tanstack/react-query` v5 for all server state — there is no Redux/Zustand/Context store for server data
- `axios` behind a thin typed `client` wrapper
- `react-hook-form` for forms; `zod` is present but only used in `users/validation.ts` (not yet wired to a resolver)

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — ESLint (flat config, typescript-eslint, react-hooks, react-refresh)
- `npm run preview` — preview a production build

There is no test runner configured yet — see [docs/TESTING.md](docs/TESTING.md).

## Folder structure

```
src/
├── api/           # axios instance, typed client, ApiError classes, http status, query client
├── features/      # one folder per feature — see CONVENTIONS.md for the internal shape
│   ├── auth/
│   └── users/
├── layout/        # MainLayout (header/aside/main/footer shell)
├── routes/        # router.tsx, ProtectedRoute.tsx
├── App.tsx
├── Providers.tsx  # wraps app in QueryClientProvider
└── main.tsx       # calls setupInterceptors() then renders
```

Full detail: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Conventions Claude must follow here

Read [docs/CONVENTIONS.md](docs/CONVENTIONS.md) before adding code. The short version:

- New features go in `src/features/<name>/` with `endpoints.ts`, `services.ts`, `types.ts`, `queryKeys.ts`, `hooks/`, `pages/`, `component(s)/`, `index.ts` (barrel export).
- Use lowercase folder names (`pages/`, `components/`) for **new** features — the existing `users` feature uses `Pages/`/`Components` (capitalized), which is legacy inconsistency, not the pattern to copy.
- All server calls go through `src/api/client.ts`, never call `axios` directly from a feature.
- Register new routes in `src/routes/router.tsx`; gate authenticated routes under `<ProtectedRoute />`.
- Query keys live in each feature's `queryKeys.ts` and are re-exported through `src/api/index.ts` for the `users` feature (auth's are consumed directly from the feature) — check the existing pattern before adding new keys.

## Docs map

- [docs/PRD.md](docs/PRD.md) — what we're building and why
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — folder structure, data flow, key decisions
- [docs/CONVENTIONS.md](docs/CONVENTIONS.md) — code style, naming, component patterns
- [docs/TESTING.md](docs/TESTING.md) — testing strategy and commands
- [docs/DECISIONS.md](docs/DECISIONS.md) — lightweight ADR index
- [docs/features/](docs/features/) — one spec per feature
- [docs/specs/](docs/specs/) — technical deep dives (API design, auth flow, state management, security, performance)
- [docs/decisions/](docs/decisions/) — detailed ADRs
- [docs/onboarding/](docs/onboarding/) — getting started, dev setup, troubleshooting
