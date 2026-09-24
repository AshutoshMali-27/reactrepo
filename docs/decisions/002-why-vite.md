# 002 — Vite over Webpack/CRA

## Status

Accepted (reflects current codebase)

## Context

The project needed a build tool for a React + TypeScript SPA with no SSR requirement.

## Decision

Use Vite (`vite.config.ts`, `@vitejs/plugin-react`) rather than Webpack (via CRA or a hand-rolled config).

## Consequences

- Fast dev server startup and HMR via native ESM in dev.
- `tsc -b && vite build` as the build pipeline — type-checking is a separate, explicit step from bundling, not inline in the bundler (so a type error and a build error are distinguishable).
- Env vars must be prefixed `VITE_` to be exposed to client code (`import.meta.env.VITE_API_URL`) — anything without that prefix silently won't reach the browser bundle.
- No SSR/meta-framework features (routing is client-side only via `react-router-dom`'s `createBrowserRouter`) — if SSR/SEO ever becomes a requirement, that's a bigger migration (e.g. to Next.js/Remix), not a Vite config tweak.

## Alternatives considered

- **Create React App**: unmaintained/deprecated at this point; not a serious alternative today.
- **Next.js/Remix**: would bring SSR and file-based routing, but this app has no SSR/SEO requirement (it's an authenticated admin tool) — the added complexity isn't justified.
