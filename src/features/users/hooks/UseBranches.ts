import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../queryKeys"
import { userservice } from "../services"

export const UseBranches=()=>{
  return  useQuery({
        queryKey:QUERY_KEYS.branches,
        queryFn:()=>userservice.GET_ALL_Branches()
    })
}