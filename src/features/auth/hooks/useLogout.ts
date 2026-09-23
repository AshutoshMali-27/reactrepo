import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../auth.services";
import { AUTH_QUERY_KEYS } from "../queryKeys";

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: AuthService.logout,
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: AUTH_QUERY_KEYS.CURRENT_USER,
            });
        },
    });
};