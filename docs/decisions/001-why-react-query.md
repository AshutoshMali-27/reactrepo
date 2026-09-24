# 001 — React Query for server state, no Redux/Zustand

## Status

Accepted (reflects current codebase, not retroactively litigated)

## Context

The app's state is almost entirely server-derived: the current user, the user list, roles, branches. There's very little pure client-side UI state that would benefit from a global store.

## Decision

Use `@tanstack/react-query` as the sole mechanism for server state — caching, loading/error states, invalidation, mutation handling. No Redux, Zustand, Jotai, or React Context is used to hold server data.

## Consequences

- Less boilerplate than Redux for the common case (fetch, cache, invalidate on mutation).
- Loading/error states come for free per-query (`isLoading`, `isError`) instead of being modeled by hand in a reducer.
- Cache invalidation is explicit and local to each mutation hook — there's no automatic dependency tracking, so every new mutation must be deliberate about what it invalidates (see [specs/state-management.md](../specs/state-management.md)).
- If the app ever needs meaningful client-only cross-cutting state (e.g. a multi-step wizard, app-wide UI preferences), that will need its own narrowly-scoped mechanism — don't force it into React Query, and don't reach for Redux/Zustand until there's a concrete need bigger than one component tree.

## Alternatives considered

- **Redux Toolkit + RTK Query**: more boilerplate for the same caching behavior; no evidence this was seriously evaluated in-repo, but it's the natural alternative if server-state needs grow more complex (offline support, normalized cross-entity caching).
- **Plain `useState`/`useEffect` fetching**: what this replaces; loses caching, dedup, and background refetch for free.
