import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../api"
import { userservice } from "../services"


export const useUser=(id:number)=>{
   return useQuery({
        queryKey:QUERY_KEYS.USER(id),
        queryFn:()=>userservice.getById(id),
        enabled:!!id
    })
}