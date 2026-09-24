# Performance

## Current state

No performance work has been done yet — no code-splitting beyond Vite's default, no bundle analysis, no memoization strategy, no image optimization pipeline beyond dropping assets in `src/assets/`. This app is small (two features, no large lists/virtualization needs observed) so this hasn't mattered yet. Treat this doc as guidelines for when it starts to, not a description of tuning already done.

## Caching strategy (in place)

The real "performance" lever already active is React Query's cache config in `src/api/queryClient.ts`:

- `staleTime: 5min` — avoids refetching unchanged data (users/roles/branches lists) on every mount within that window.
- `refetchOnWindowFocus: false`, `refetchOnMount: false` — avoids redundant refetches when switching tabs or re-rendering routes.
- `gcTime: 10min` — cached data is garbage-collected after 10 minutes unused.

When adding a new query, don't override these defaults unless there's a concrete reason (e.g. `useCurrentUser`'s `retry: false`).

## Things to watch as the app grows

- **Route-based code splitting**: `router.tsx` currently imports every page eagerly. If the feature set grows meaningfully, switch to `React.lazy` + `Suspense` per route rather than eagerly bundling everything.
- **List rendering**: `UserTable` renders the full `users` array with no pagination or virtualization (`PagedResponse<T>` exists in `api/api-response.ts` but is unused). If user lists grow large, wire up server-side pagination before reaching for client-side virtualization.
- **Bundle size**: no analysis has been run (`vite-bundle-visualizer` or similar) — worth doing once there are more than a couple of features, not preemptively now.

## Don't

Don't add memoization (`useMemo`/`useCallback`/`React.memo`) speculatively — none of the current components have a demonstrated re-render problem. Profile first if something feels slow.
