import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../queryKeys"
import { userservice } from "../services"

export const useRoles=()=>{
    return useQuery({
           queryKey:QUERY_KEYS.roles,
                queryFn:()=>userservice.GET_ALL_Role()
    })
}