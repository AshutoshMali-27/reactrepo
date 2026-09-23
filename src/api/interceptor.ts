import { AxiosError } from "axios";
import { axiosInstace } from "./axios";

export const setupInterceptors = () => {

    axiosInstace.interceptors.request.use(
        (config) => {

          config.headers["X-Requested-With"] = "XMLHttpRequest";
          console.log(`[REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
          return config;         
        },
        (error) => Promise.reject(error)
    );

    axiosInstace.interceptors.response.use(
        (response) => response,

        (error: AxiosError) => {

            if (error.response?.status === 401) {
                console.log("Unauthorized");
            }

            if (error.response?.status === 403) {
                console.log("Forbidden");
            }

            if (error.response?.status === 500) {
                console.log("Internal Server Error");
            }

            return Promise.reject(error);
        }
    );
};