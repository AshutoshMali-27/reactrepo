import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../auth.services";
import { AUTH_QUERY_KEYS } from "../queryKeys";
import type { LoginRequests } from "../types";

export const useLogin = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: LoginRequests) =>
            AuthService.login(request),
        onSuccess: (response) => {
            queryClient.setQueryData(
                AUTH_QUERY_KEYS.CURRENT_USER,
                response.data
            );

        },
    });
};