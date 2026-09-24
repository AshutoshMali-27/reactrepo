# Product Requirements

> **Status: inferred from code, not yet reviewed by a product owner.** This app currently has no written PRD — the sections below describe what the code does today. Replace inferred content with real product goals as they're decided; keep this doc in sync with actual direction rather than aspirational scope.

## What this is

An internal admin tool for managing application users. An authenticated operator can:

- Log in with a username/password (session-cookie based)
- View a list of users
- Add a new user (with role and branch assignment)
- Edit an existing user

## Who uses it

Inferred: internal staff / admins with credentials issued out-of-band (there is no self-service signup flow in the code). No role-based UI gating exists yet — any authenticated user sees the same screens.

## Current scope (what exists in code)

| Capability | Status |
| --- | --- |
| Login / logout | Implemented ([docs/features/authentication.md](features/authentication.md)) |
| Route protection | Implemented (`ProtectedRoute` redirects to `/login`) |
| List users | Implemented |
| Create user | Implemented |
| Edit user | Implemented |
| Delete user | UI stub only — `handleDelete` currently just logs, no API call wired |
| Roles / branches | Read-only lookups used to populate user forms |
| Role-based permissions | Not implemented |
| Password reset / forgot password | Not implemented |

## Out of scope (not in this codebase)

Anything not listed above — notifications, dashboards, exports, etc. — does not exist yet. Don't assume it when planning work; add it here first if it becomes a real requirement.

## Open questions

- Who can create/edit users — is this meant to be role-gated?
- Is delete a real requirement, or should the stub be removed?
- What validation rules should the backend vs. frontend own (see [docs/specs/api-design.md](specs/api-design.md))?
