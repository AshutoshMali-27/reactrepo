# State management

## No global client-state store

There is no Redux, Zustand, Jotai, or React Context used for application state. This is deliberate, not an oversight — see [decisions/001-why-react-query.md](../decisions/001-why-react-query.md). Don't introduce one speculatively; if a real cross-cutting client-state need shows up (e.g. a theme toggle, a multi-step wizard spanning routes), that's the trigger to add something narrowly scoped for that need, not a general store.

## Server state: React Query

All data that comes from the backend (users, roles, branches, current user) lives in the React Query cache, configured once in `src/api/queryClient.ts` and provided via `Providers.tsx`.

- **Query keys** are per-feature factories (`AUTH_QUERY_KEYS`, `QUERY_KEYS`) — always import the key, never inline `["users"]` literals, so invalidation stays consistent across files.
- **Invalidation** is manual, per-mutation (`onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS })`). There's no automatic invalidation-by-convention (like a tag system) — every mutation hook must explicitly say what it invalidates.
- **Cache seeding**: `useLogin` uses `setQueryData` instead of invalidating, to avoid an extra round-trip when the mutation response already contains what a refetch would return. Prefer this pattern when a mutation's response *is* the fresh state of a singleton resource (like "current user"); use invalidation when the affected data is a list/collection that the mutation only partially reflects (like creating one user among many).

## Local/UI state

Component-local state (`useState`) and `react-hook-form`'s internal form state are the only other state mechanisms in use. Form state is not lifted or persisted outside the form component.

## Adding new server state

1. Does it belong to an existing feature, or is it a new feature? (See [ARCHITECTURE.md](../ARCHITECTURE.md).)
2. Add a query key to that feature's `queryKeys.ts`.
3. Add a `useQuery`/`useMutation` hook — don't call the service directly from a component.
4. Decide invalidate-vs-setQueryData based on the rule above.
