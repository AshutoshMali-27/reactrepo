import { useQuery } from "@tanstack/react-query";
import { AUTH_QUERY_KEYS } from "../queryKeys";
import { AuthService } from "../auth.services";


export const useCurrentUser = () => {
    return useQuery({
        queryKey: AUTH_QUERY_KEYS.CURRENT_USER,
        queryFn:()=> AuthService.getCurrentUser(),
        retry: false,
    });
};