---
description: Investigate and fix a described bug or issue in this app
---

Given a bug description (from the user, an issue tracker, or a stack trace):

1. Reproduce the mental model: trace the relevant slice end-to-end — page → hook → service → `client.ts` → `axios.ts` — before changing anything. See [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) for the data-flow diagram.
2. Check whether the bug is already a documented known gap or open question in [docs/features/](../../docs/features/) or [docs/specs/](../../docs/specs/) — if so, the fix should resolve that entry, and the doc should be updated to reflect the new state rather than left describing stale behavior.
3. Identify root cause before patching symptoms — e.g. if a query isn't refreshing, check whether the right query key is being invalidated (see [docs/specs/state-management.md](../../docs/specs/state-management.md)) rather than adding a manual refetch call as a workaround.
4. Fix it following [docs/CONVENTIONS.md](../../docs/CONVENTIONS.md) — don't introduce a new pattern to fix an isolated bug.
5. Manually verify in the browser (`npm run dev`) — there's no automated test suite yet (see [docs/TESTING.md](../../docs/TESTING.md)), so this is the only verification available.
6. Run `npm run lint`.

If the fix reveals the bug was actually a symptom of one of the documented inconsistencies (e.g. the `isActive: number` vs `boolean` mismatch, or the unwired `zod` schema), say so explicitly rather than quietly patching around it.
