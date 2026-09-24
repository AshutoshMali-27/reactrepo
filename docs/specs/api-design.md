# API design

## Layers

```
feature service (e.g. AuthService, userservice)
  → src/api/client.ts        typed get/post/put/patch/delete
    → src/api/axios.ts       shared axios instance
```

- `axios.ts` creates one instance: `baseURL = import.meta.env.VITE_API_URL`, `timeout: 5000`, `withCredentials: true`, JSON headers.
- `client.ts` wraps each verb generically (`client.get<T>(url, config)`) and returns `response.data` directly — callers get the body, not the full axios response.
- `request-options.ts` defines `defaultRequestOptions` (30s timeout, `withCredentials`, JSON headers) — currently not passed anywhere; the effective timeout in practice is the 5s set on the axios instance itself. If you need per-request overrides, pass `AxiosRequestConfig` as the last arg to a `client.*` call.

## Response shape

`api-response.ts` defines the intended envelope:

```ts
interface ApiResponse<T> { success: boolean; message: string; data: T }
interface PagedResponse<T> { items: T[]; totalCount: number; pageNumber: number; pageSize: number }
```

`auth.services.ts` types its calls as `ApiResponse<LoginResponse>` — consistent with this envelope. `users/services.ts` types calls as the raw shape (`User[]`, `User`) — **check which is actually true against the live backend** before assuming either feature's typing is correct; they can't both be right unless the backend genuinely returns different envelopes for different endpoints.

## Endpoints

Each feature owns its own endpoint constants (`auth.endpoints.ts`, `users/endpoints.ts`) — no shared endpoint registry. Static paths are string constants; parameterized paths are functions (`GET_BY_ID: (id) => \`...${id}\``). Keep this pattern for new endpoints rather than string-templating inline in a service call.

## Errors

`error.ts` defines a class hierarchy (`ApiError` base, `UnauthorizedError`/`ForbiddenError`/`NotFoundError`/`ValidationError` with fixed status codes) — but nothing in the codebase currently throws or catches these. The actual error handling today is:

- `interceptor.ts` logs specific status codes (401/403/500) to the console and re-rejects.
- Callers (hooks) get a rejected promise from axios (an `AxiosError`), not one of the `ApiError` subclasses.

If you want the `ApiError` hierarchy to mean something, it needs to be constructed somewhere (likely in the response interceptor, mapping `AxiosError` → the matching `ApiError` subclass) — it isn't wired up yet.

`http-status.ts` (`HTTP_STATUS` + `HttpStatus` type) exists for status-code comparisons — prefer `error.response?.status === HTTP_STATUS.UNAUTHORIZED` over a bare `401` for new code.

## React Query defaults

`queryClient.ts`:

- Queries: `retry: 1`, `staleTime: 5min`, `gcTime: 10min`, `refetchOnWindowFocus: false`, `refetchOnReconnect: true`, `refetchOnMount: false`, `networkMode: "online"`
- Mutations: `retry: 0`, `networkMode: "online"`

Override per-hook only with a specific reason (e.g. `useCurrentUser`'s `retry: false`, since retrying a 401 is pointless).

## Adding a new endpoint

1. Add the path to the feature's `endpoints.ts`.
2. Add/extend request & response types in `types.ts`.
3. Add a method to the feature's service, typed with `client.<verb><ResponseType>(...)`.
4. Add a `useQuery`/`useMutation` hook in `hooks/`, using a key from `queryKeys.ts`.
5. Consume the hook from a page/component.
