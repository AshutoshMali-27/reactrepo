import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userservice } from "../services";
import { QUERY_KEYS } from "../../../api";

export const useCreateduser=()=>{

const queryClient=useQueryClient();
   return useMutation({
mutationFn:userservice.create,
onSuccess:()=>{
queryClient.invalidateQueries({
queryKey:QUERY_KEYS.USERS
});
},
onError:(error)=>{
    console.error("Error creating user:", error);
}

});

}