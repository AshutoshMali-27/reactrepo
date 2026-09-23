export const QUERY_KEYS = {

    USERS: ["users"] as const,
    roles:["roles"] as const,
    branches:["branches"] as const,

    USER: (id: number | string) =>
        ["users", id] as const,

};