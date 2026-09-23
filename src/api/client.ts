import type { AxiosRequestConfig } from "axios";
import { axiosInstace } from "./axios";

export const client = {
    get: async <T>(url: string,config?: AxiosRequestConfig) => {
        const response = await axiosInstace.get<T>(url, config);
        return response.data;   
    },
    post: async <T>( url: string,data?: unknown,config?: AxiosRequestConfig ) => {
        const response = await axiosInstace.post<T>( url, data,config);
        return response.data;
    },
    put: async <T>(url: string,data?: unknown,config?: AxiosRequestConfig) => {
        const response = await axiosInstace.put<T>(url,data,config);
        return response.data;
    },
    patch: async <T>(url: string,data?: unknown,config?: AxiosRequestConfig) => {
        const response = await axiosInstace.patch<T>( url, data,config);
        return response.data;
    },
    delete: async <T>(url: string, config?: AxiosRequestConfig ) => {
        const response = await axiosInstace.delete<T>(url, config );
        return response.data;
    },
};