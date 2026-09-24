---
description: Review the current diff against this repo's documented conventions
---

Review the pending changes (staged + unstaged, or the diff against `main`) for:

1. **Correctness bugs** — same bar as a normal code review.
2. **Convention drift**, specifically checked against [docs/CONVENTIONS.md](../../docs/CONVENTIONS.md):
   - Feature code calling `axios` directly instead of going through `src/api/client.ts`
   - Inline query key literals instead of `queryKeys.ts` entries
   - New `pages/`/`components/` folders using capitalized names (only `users` is grandfathered)
   - Mutations that don't invalidate/seed the query keys they affect
   - Form validation logic duplicated instead of reusing/extending the feature's `validation.ts`
3. **Doc drift** — if the change adds/changes an endpoint, a route, a feature's scope, or a documented "open question," check whether the relevant file under `docs/` (feature doc, ARCHITECTURE.md, PRD.md scope table) needs a matching update. Flag it rather than silently updating docs unless asked.
4. **Known gaps** — don't re-flag issues already documented as known/open in `docs/` (e.g. the unused `ApiError` hierarchy, the missing delete-user wiring) unless the diff touches that exact code path.

Report findings the same way `/code-review` would — most severe first, with file:line references. This command is a lighter, convention-focused pass; use `/code-review` for a full correctness-focused review.
