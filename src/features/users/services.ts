import { client, ENDPOINTS,  } from "../../api";
import type { branches, roles, User, userCreate, userUpdate } from "./types";


export const userservice={
    GET_ALL(){
             return client.get<User[]>(ENDPOINTS.USERS.GET_ALL);
    },
     GET_ALL_Role(){
             return client.get<roles[]>(ENDPOINTS.USERS.GET_all_role);
    },
    GET_ALL_Branches(){
             return client.get<branches[]>(ENDPOINTS.USERS.GET_all_branches);
    },
    getById(id: number) {
             return client.get<User>(ENDPOINTS.USERS.GET_BY_ID(id));
    },
     create(data:userCreate) {            
             return client.post(ENDPOINTS.USERS.CREATE_User,data );
    },
     update(data:userUpdate) {
             return client.post(ENDPOINTS.USERS.UPDATE, data);
    },
}