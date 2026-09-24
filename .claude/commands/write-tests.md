---
description: Add tests for a hook, service, or component, setting up the test runner first if needed
---

There is no test runner configured in this repo yet (see [docs/TESTING.md](../../docs/TESTING.md)). Before writing any test:

1. Check if Vitest + Testing Library are already installed (`package.json` devDependencies). If not, set them up first, following the setup steps in [docs/TESTING.md](../../docs/TESTING.md), and add the `test`/`test:watch` scripts — confirm with the user before adding new dependencies if that wasn't explicitly requested.
2. Place the test next to what it tests, not in a separate `__tests__` root.

Then, depending on what's being tested (see [docs/TESTING.md](../../docs/TESTING.md) for the full strategy):

- **Hooks** (`hooks/*.ts`): use `renderHook` wrapped in a fresh `QueryClientProvider` per test (`retry: 0`); mock the feature's service module (`services.ts`/`*.services.ts`), not `axios`.
- **Services**: mock `client` from `src/api/client.ts`; assert the correct endpoint constant and payload are used.
- **Components/pages**: render with Testing Library; assert on user-visible output (validation messages, loading/error states, navigation), not internal state.
- **`ProtectedRoute`**: mock `useCurrentUser` to cover loading/authenticated/unauthenticated states and assert the redirect behavior.

Don't write tests that assert on implementation details (internal hook state shape, exact axios config objects) — assert on behavior a consumer would observe.
