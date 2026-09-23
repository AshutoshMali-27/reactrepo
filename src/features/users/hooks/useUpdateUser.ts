import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { queryClient, QUERY_KEYS } from "../../../api";
import { userservice } from "../services";
import type { userUpdate } from "../types";

export const useUpdateUser = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: userUpdate) =>
            userservice.update(data),

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.USERS,
            });
            
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.USER(variables.userID),
            });

            navigate("/users");
        },
    });
};