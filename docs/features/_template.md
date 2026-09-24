# Feature: <name>

Copy this file to `docs/features/<feature-name>.md` when starting a new feature. Delete any section that doesn't apply rather than leaving it blank.

## Overview

One paragraph: what this feature does and who uses it.

## User stories

- As a <role>, I want to <action>, so that <outcome>.

## UI / pages

- Route(s): `/...`
- Page component(s): `src/features/<name>/pages/...`
- Key components: ...

## API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | ... | ... |

Defined in `src/features/<name>/endpoints.ts`. Response shape: link or describe the `ApiResponse<T>` / raw type actually returned.

## Data model

Key types from `src/features/<name>/types.ts` and what each field means (especially anything non-obvious, like enum-coded status fields).

## State / query keys

- Query keys: `src/features/<name>/queryKeys.ts`
- Notable cache behavior (custom `staleTime`, manual invalidation, optimistic updates, etc.)

## Edge cases & error states

- What happens on validation failure, 401/403, empty lists, network error?

## Out of scope

What this feature explicitly does not do (prevents scope creep and mistaken assumptions later).

## Open questions

Anything undecided that a reviewer or product owner needs to weigh in on.
