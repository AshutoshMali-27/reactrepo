---
description: Add a new component to an existing feature, following this repo's conventions
---

Add a new component to an existing feature under `src/features/<feature>/components/` (or `Components/` if the target feature already uses that capitalization — match the existing feature, don't introduce a third variant within one feature).

Before writing it:

1. Identify which feature it belongs to. If it doesn't clearly belong to one, that's a signal it might need its own feature — check with the user rather than guessing.
2. Check [docs/CONVENTIONS.md](../../docs/CONVENTIONS.md) for naming and structure.
3. Look at an existing component in the same feature (or `LoginForm.tsx`/`UserForm.tsx` as references) for the local style: how props are typed (an inline `interface XProps`), how forms use `react-hook-form`, how loading/error/mutation state is surfaced to the user.

When writing it:

- Type props explicitly with an interface (`interface FooProps { ... }`), not inline object types.
- If it needs server data, consume an existing hook from `hooks/` — don't call a service or `client.*` directly from a component.
- If it's a form, use `react-hook-form`'s `register`, and surface `formState.errors` per-field like `LoginForm.tsx` does.
- No comments explaining what the JSX does — only non-obvious *why* comments, and only if truly needed.

After writing it, run `npm run lint` and manually verify it renders in the browser (no test runner exists yet — see [docs/TESTING.md](../../docs/TESTING.md)).
