# Feature: User management

## Overview

CRUD on application users, with role and branch assignment pulled from read-only lookup endpoints. This is the core feature of the app — it's what `/` resolves to.

## User stories

- As an operator, I want to see a list of all users, so that I can find who I need to manage.
- As an operator, I want to add a new user with a role and branch, so that they can access the system.
- As an operator, I want to edit an existing user's details.
- As an operator, I want to delete a user — **not yet implemented**, see below.

## UI / pages

- Routes: `/` and `users` → `UserList`; `users/add` → `AddUser`; `users/edit/:id` → `EditUser` (all under `<ProtectedRoute />` + `<MainLayout />`)
- Pages: `src/features/users/Pages/{User,AddUser,EditUser}.tsx`
- Components: `src/features/users/Components/{UserTable,UserForm}.tsx`

Note the capitalized `Pages/`/`Components/` folders — legacy naming, see [CONVENTIONS.md](../CONVENTIONS.md).

## API endpoints

Defined in `src/features/users/endpoints.ts` (`ENDPOINTS.USERS`):

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `User/getuserDetails` | List all users |
| GET | `/User/getuserdetailbyid?userid=<id>` | Get one user |
| POST | `User/SetUserMaster` | Create user |
| POST | `User/Updateuserdetails` | Update user |
| DELETE | `/users/<id>` | Delete user — **defined but not called from any hook/UI yet** |
| GET | `User/getroledetails` | List roles (for form dropdowns) |
| GET | `User/getbranchdetails` | List branches (for form dropdowns) |

## Data model

From `src/features/users/types.ts`:

- `User` — full record incl. `passwordHash`, `createdDate`, `branchCode`, `isActive` (`number`, not `boolean`), `roleId`
- `userCreate` / `userUpdate` — near-identical shapes to `User` (`userUpdate` adds `userID`)
- `roles` — `{ roleID, roleName, isActive }`
- `branches` — `{ branchId, branchCode, branchName, isActive }`

Note `isActive` is `number` on `User`/`userCreate`/`userUpdate` but `boolean` on `roles`/`branches` — inconsistent, worth normalizing if touching this code.

`users/validation.ts` has a `zod` schema (`userSchema`) with different field casing (`UserName`, `Email`, `PasswordHash`, `PhoneNumber`) than the actual types (`userName`, `email`, `passwordHash`, `phoneNumber`) — it does not appear to be wired into `UserForm` yet. Don't assume it's enforced.

## State / query keys

`src/features/users/queryKeys.ts` (`QUERY_KEYS`), re-exported through `src/api/index.ts`:

- `QUERY_KEYS.USERS`, `QUERY_KEYS.roles`, `QUERY_KEYS.branches`, `QUERY_KEYS.USER(id)`
- `useUsers`, `useUser`, `UseRoles`, `UseBranches` — plain `useQuery` wrappers
- `useCreateduser`, `useUpdateUser` — `useMutation`, invalidate `QUERY_KEYS.USERS` on success

## Edge cases & error states

- `UserList.handleDelete` currently only `console.log`s — no delete mutation is wired up despite the endpoint existing. Don't assume delete works from the UI.
- No optimistic updates — list refetches after create/update via invalidation.
- No pagination — `GET_ALL` returns the full list; `PagedResponse<T>` exists in `api/api-response.ts` but isn't used here.

## Out of scope

Bulk actions, pagination, search/filtering, role-based edit permissions, soft-delete/audit trail.

## Open questions

- Should delete actually be implemented, and does the backend really expect `/users/<id>` (inconsistent casing/shape vs. every other endpoint here, which is `User/...`)?
- Should `userCreate`/`userUpdate` be deduplicated against `User`, or kept intentionally separate?
