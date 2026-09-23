import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from  '../../../api'
import { userservice } from "../services"
export const useUsers=()=>{
  return  useQuery({
        queryKey:QUERY_KEYS.USERS,
        queryFn:()=>userservice.GET_ALL()
    })
}


