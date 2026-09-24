# Conventions

These reflect what the codebase actually does today, with the target pattern called out where current code deviates from it. When in doubt, match the `auth` feature over the `users` feature — it's the more consistent of the two.

## Feature folder shape

Every feature lives at `src/features/<name>/` with this internal structure (target — lowercase folders):

```
<name>/
├── <name>.endpoints.ts   # or endpoints.ts — URL path constants / builders
├── <name>.services.ts    # or services.ts — thin wrappers calling api/client.ts
├── types.ts               # request/response/domain types
├── <name>.validation.ts   # or validation.ts — form validation rules
├── queryKeys.ts            # React Query key factory for this feature
├── hooks/                  # useX hooks (useQuery/useMutation), one concern per file
├── components/             # presentational/feature components (lowercase)
├── pages/                  # route-level components (lowercase)
└── index.ts                 # barrel — public surface of the feature
```

`users` currently has `Components/` and `Pages/` (capitalized) — legacy, don't copy for new features. Don't rename it opportunistically either; do it as its own deliberate change if asked.

## Naming

- Endpoint constant objects: `SCREAMING_SNAKE` groups (`AUTH_ENDPOINTS`, `ENDPOINTS.USERS`).
- Query key factories: `SCREAMING_SNAKE` object (`AUTH_QUERY_KEYS`, `QUERY_KEYS`), values are `as const` tuples; parameterized keys are functions (`QUERY_KEYS.USER(id)`).
- Services: `PascalCaseService` object with method shorthand (`AuthService.login(...)`) or `lowercase` object (`userservice`) — prefer the `AuthService`-style export for new features (clearer as a named import, reads as a namespace).
- Hooks: `useX` — one hook per file, filename matches the hook (`useLogin.ts` → `useLogin`). Match case exactly; the `users` feature has an inconsistent `UseBranches.ts`/`UseRoles.ts` (capital U) — don't copy that for new files.
- Types: `PascalCase` interfaces, request/response suffixed by intent (`LoginRequests`, `LoginResponse`, `userCreate`, `userUpdate`) — prefer `PascalCase` type names throughout (`UserCreate`, `UserUpdate`) for new code.

## API calls

- Never call `axios` directly from feature code. Always go through `client.get/post/put/patch/delete` from `src/api/client.ts`.
- Endpoint paths are constants in the feature's `endpoints.ts`, not inlined in the service.
- Type every `client.*` call with its expected response shape (`client.get<User[]>(...)`), even if that means introducing an `ApiResponse<T>` wrapper type to match what the backend actually returns.

## React Query

- One hook per query/mutation; don't hand-roll `useQuery`/`useMutation` inline in components.
- Query keys always come from the feature's `queryKeys.ts` — never inline array literals as keys.
- Mutations that change a resource invalidate (or set) the relevant query key in `onSuccess`, mirroring `useLogin`/`useCreateduser`.
- Default query behavior (`retry`, `staleTime`, `refetchOnWindowFocus`, etc.) is centralized in `src/api/queryClient.ts` — override per-query only when there's a specific reason (see `useCurrentUser`'s `retry: false`).

## Forms

- `react-hook-form` for all forms; validation rules passed inline via `register(name, { ... })` today (see `LoginForm`).
- `zod` is a dependency and `users/validation.ts` defines a schema, but it isn't wired to a resolver yet (no `zodResolver`). If you add zod-based validation, wire it properly with `@hookform/resolvers/zod` rather than leaving a second, unused validation path.

## Routing

- All routes are declared in `src/routes/router.tsx` via `createBrowserRouter`. Don't create ad-hoc `<Routes>` elsewhere.
- Anything requiring a logged-in user is a child of `<ProtectedRoute />`.
- Anything requiring the app chrome (header/aside/footer) is a child of `<MainLayout />`.

## General style

- No comments explaining *what* code does — only *why*, and only when non-obvious.
- No unused abstractions ahead of need — the current codebase intentionally has no global client-state store, no role-based access layer, and no design system; don't introduce one speculatively.
- Run `npm run lint` before considering a change done.
