# Testing

## Current state

There is no test runner configured in this repo yet — no Vitest/Jest, no React Testing Library, no `test` script in `package.json`. `npm run lint` (ESLint) is the only automated check today. Treat any claim of "tests pass" for this project as false until a runner exists.

## Recommended setup (not yet done)

This is a Vite + React + TypeScript project, so Vitest is the natural fit (shares Vite config, fast, ESM-native):

```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

Add to `package.json`:

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

And a `vitest.config.ts` (or extend `vite.config.ts`) with `environment: "jsdom"`.

## Strategy once a runner exists

Match the feature-based structure — tests live next to what they test, not in a parallel `__tests__` tree at the root:

- **Hooks** (`features/*/hooks/*.ts`): test with `@testing-library/react`'s `renderHook`, mocking the service layer (`userservice`, `AuthService`) rather than hitting real HTTP. Wrap in a `QueryClientProvider` with a fresh `QueryClient` per test (retry: 0, to fail fast).
- **Services** (`services.ts` / `*.services.ts`): mock `client` (from `src/api/client.ts`), assert the right endpoint and payload shape are sent.
- **Components/pages**: render with Testing Library, assert on user-visible behavior (form validation messages, loading/error states), not implementation details.
- **Routing/auth gating** (`ProtectedRoute`): test the redirect-to-`/login` behavior by mocking `useCurrentUser`.

Don't mock `axios` at the transport level for hook/component tests — mock at the service boundary (`userservice`, `AuthService`) so tests don't couple to axios internals.

## What to prioritize first

1. `ProtectedRoute` — the only real security-relevant logic in the frontend.
2. `useLogin` / `useLogout` / `useCurrentUser` — auth session behavior.
3. User CRUD hooks — the core feature surface.

## Manual verification (until automated tests exist)

For any UI change, actually run `npm run dev`, exercise the golden path in a browser (login → list → add → edit), and check the loading/error states — not just that it compiles.
