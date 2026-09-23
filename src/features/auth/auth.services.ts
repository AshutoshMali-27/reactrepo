import { client, type ApiResponse } from "../../api";
import { AUTH_ENDPOINTS } from "./auth.endpoints";
import type { LoginRequests, LoginResponse } from "./types";
export const AuthService = {

  login: (request: LoginRequests) =>
        client.post<ApiResponse<LoginResponse>>(
            AUTH_ENDPOINTS.LOGIN,
            request
        ),

    logout: () =>
        client.post<ApiResponse<null>>(
            AUTH_ENDPOINTS.LOGOUT
        ),

    getCurrentUser: () =>
        client.get<ApiResponse<LoginResponse>>(
            AUTH_ENDPOINTS.CURRENT_USER
        ),
};