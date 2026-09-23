import type { AxiosRequestConfig } from "axios";

export const defaultRequestOptions: AxiosRequestConfig = {
    timeout: 30000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};