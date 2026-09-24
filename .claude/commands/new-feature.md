---
description: Scaffold a new feature following this repo's feature-folder convention
---

Guide the full workflow for adding a new feature to `src/features/<name>/`, matching the pattern documented in [docs/CONVENTIONS.md](../../docs/CONVENTIONS.md) and [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md). Use the `auth` feature as the reference example (it's the more consistent of the two existing features) — not `users`, which has known naming inconsistencies (`Pages/`/`Components/` capitalization) documented in CONVENTIONS.md.

Steps:

1. Ask what the feature does and what backend endpoints it needs, if not already given.
2. Create `src/features/<name>/`:
   - `endpoints.ts` — URL path constants (static as strings, parameterized as functions)
   - `types.ts` — request/response/domain types
   - `services.ts` — thin wrappers calling `client.*` from `src/api/client.ts` (never call `axios` directly)
   - `validation.ts` — form validation rules (only add `zod` + a resolver if you're actually wiring it to `react-hook-form`'s `resolver` option — don't leave an unused schema like `users/validation.ts` does)
   - `queryKeys.ts` — key factory, `as const` tuples, parameterized keys as functions
   - `hooks/` — one `useQuery`/`useMutation` hook per file, named `useX`
   - `components/` and `pages/` — lowercase folder names
   - `index.ts` — barrel exporting the feature's public surface (pages, hooks, service, types)
3. Register any new routes in `src/routes/router.tsx`, nested under `<ProtectedRoute />` and `<MainLayout />` unless the feature is intentionally public (like `/login`).
4. Write a feature doc at `docs/features/<name>.md` using [docs/features/_template.md](../../docs/features/_template.md).
5. Run `npm run lint`.

Don't introduce a new state-management pattern, a new HTTP client, or a new form library — reuse React Query, `client.ts`, and `react-hook-form` as every existing feature does.
