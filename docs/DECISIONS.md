# Decisions log

Lightweight index of architectural decisions. Each entry is one line — expand into a full ADR under [docs/decisions/](decisions/) only when the reasoning is non-obvious or contested enough to be worth preserving in detail.

| # | Decision | Why (short) | Detail |
| --- | --- | --- | --- |
| 001 | React Query for all server state, no Redux/Zustand | Server state (users, auth session) dominates; avoids duplicating cache/loading/error handling by hand | [decisions/001-why-react-query.md](decisions/001-why-react-query.md) |
| 002 | Vite as build tool | Fast dev server/HMR, first-class React + TS template, no legacy webpack config to maintain | [decisions/002-why-vite.md](decisions/002-why-vite.md) |
| 003 | Typed `client` wrapper over raw axios | Single choke point for request/response typing, error normalization, and interceptor wiring | [decisions/003-api-layer-design.md](decisions/003-api-layer-design.md) |

## Adding a new decision

Copy the shape of an existing file in `docs/decisions/`, number it sequentially, and add a row here. Keep the row itself to one line — the "why" belongs in the row, the full reasoning/tradeoffs in the linked file.
