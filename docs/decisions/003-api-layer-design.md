# 003 — Typed `client` wrapper over raw axios

## Status

Accepted (reflects current codebase); partially inconsistent in practice — see "Known gaps" below.

## Context

Every feature needs to call the backend REST API. Calling `axios` directly from each feature would scatter baseURL/timeout/credential config, and would make it easy for one feature to configure requests differently from another.

## Decision

Centralize a single `axiosInstace` (`src/api/axios.ts`) and expose only a generic typed wrapper (`src/api/client.ts`) with `get/post/put/patch/delete` methods that return `response.data` directly. Feature services call `client.*`, never `axios` directly. Interceptors (`src/api/interceptor.ts`) are attached once, in `main.tsx`, before the app renders.

## Consequences

- One place to change baseURL, timeout, credentials, or headers for every request in the app.
- One place to add cross-cutting behavior (logging, auth-error handling) via interceptors.
- Callers get the response body directly (`client.get<User[]>(...)` returns `User[]`, not `AxiosResponse<User[]>`), which is convenient but means callers must independently know/assert whether the backend wraps that body in `ApiResponse<T>` — see [specs/api-design.md](../specs/api-design.md) for the current inconsistency between `auth` (typed as `ApiResponse<T>`) and `users` (typed as the raw shape).

## Known gaps (as of this writing)

- `error.ts`'s `ApiError` class hierarchy is defined but never constructed/thrown anywhere — the interceptor only logs and re-rejects the raw `AxiosError`. If this hierarchy is meant to be the app's error-handling contract, the response interceptor needs to actually map `AxiosError` → the right `ApiError` subclass.
- `request-options.ts`'s `defaultRequestOptions` isn't applied anywhere — the effective per-request config is whatever's set directly on `axiosInstace` plus whatever a caller passes explicitly.

These are implementation gaps against the original intent, not reasons to abandon the pattern — fix them by wiring the existing pieces together, not by adding a second parallel mechanism.

## Alternatives considered

- **Calling axios directly per feature**: rejected — would duplicate baseURL/credentials config and make interceptor behavior inconsistent across features.
- **A full API client generated from an OpenAPI/Swagger spec**: would give end-to-end type safety from the backend contract, but there's no evidence a spec exists yet; worth revisiting if the backend ever publishes one.
