# Architecture

## High-level shape

Feature-based frontend. Each feature under `src/features/` owns its own endpoints, service calls, types, query keys, hooks, and UI. Cross-cutting API plumbing lives in `src/api/`.

```
src/
├── api/                    # shared HTTP layer — see specs/api-design.md
│   ├── axios.ts            # axios instance (baseURL, timeout, withCredentials)
│   ├── interceptor.ts      # request/response interceptors, setupInterceptors()
│   ├── client.ts           # typed get/post/put/patch/delete wrapper over axios
│   ├── api-response.ts     # ApiResponse<T>, PagedResponse<T>
│   ├── error.ts            # ApiError + Unauthorized/Forbidden/NotFound/Validation
│   ├── http-status.ts      # HTTP_STATUS constants
│   ├── request-options.ts  # defaultRequestOptions
│   ├── queryClient.ts      # React Query QueryClient with default cache/retry config
│   └── index.ts            # barrel — also re-exports users' endpoints/queryKeys (see note below)
│
├── features/
│   ├── auth/
│   │   ├── auth.endpoints.ts
│   │   ├── auth.services.ts
│   │   ├── auth.validation.ts
│   │   ├── types.ts
│   │   ├── queryKeys.ts
│   │   ├── hooks/           # useLogin, useLogout, useCurrentUser
│   │   ├── component/       # LoginForm
│   │   ├── pages/           # Login
│   │   └── index.ts
│   └── users/
│       ├── endpoints.ts
│       ├── services.ts
│       ├── types.ts
│       ├── validation.ts    # zod schema (not yet wired to react-hook-form resolver)
│       ├── queryKeys.ts
│       ├── hooks/           # useUsers, useUser, useCreateduser, useUpdateUser, UseRoles, UseBranches
│       ├── Components/      # UserForm, UserTable
│       ├── Pages/            # User (list), AddUser, EditUser
│       └── index.ts
│
├── layout/
│   └── mainLayout.tsx       # header/aside/main(Outlet)/footer shell
│
├── routes/
│   ├── router.tsx           # createBrowserRouter tree
│   └── ProtectedRoute.tsx   # gates children behind useCurrentUser()
│
├── App.tsx                  # <RouterProvider>
├── Providers.tsx             # <QueryClientProvider>
└── main.tsx                  # setupInterceptors() then render
```

**Known inconsistency:** `auth` uses lowercase `component/`/`pages/`; `users` uses capitalized `Components/`/`Pages/`. This predates any documented convention — new features should follow the lowercase pattern (see [CONVENTIONS.md](CONVENTIONS.md)).

## Data flow

```
Page component
  → feature hook (useQuery / useMutation, React Query)
    → feature service (userservice / AuthService)
      → api/client.ts (typed get/post/put/patch/delete)
        → axios instance (src/api/axios.ts)
          → backend REST API (VITE_API_URL)
```

- Server state lives entirely in the React Query cache. There is no Redux/Zustand/Context store for API data.
- Query invalidation is manual and local to each mutation hook (e.g. `useCreateduser` invalidates `QUERY_KEYS.USERS` on success).
- Auth session state is just the `useCurrentUser()` query — a 401 there means "not logged in." There is no separate auth context/store.

## Routing & auth gating

`router.tsx` defines:

- `/login` — public
- Everything else — wrapped in `<ProtectedRoute />` → `<MainLayout />` → feature pages

`ProtectedRoute` calls `useCurrentUser()`; while loading it renders a placeholder, on error/no-data it redirects to `/login` with the original location in `state.from` (not yet consumed on login redirect-back).

## Bootstrapping (`main.tsx`)

1. `setupInterceptors()` — attaches axios request/response interceptors (must run once, before any request fires)
2. Render `<Providers><App /></Providers>` — `Providers` wraps in `QueryClientProvider`

## Backend contract assumptions

- Session is cookie-based (`withCredentials: true` on the axios instance) — no bearer token/localStorage handling in the code.
- API responses for `auth` are wrapped in `ApiResponse<T>` (`{ success, message, data }`); `users` service calls currently type responses as the raw shape (`User[]`, `User`) rather than `ApiResponse<User[]>` — check the actual backend response shape before assuming which is correct (see [docs/specs/api-design.md](specs/api-design.md)).
