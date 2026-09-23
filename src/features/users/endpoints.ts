export const ENDPOINTS = {
    USERS: {
        GET_ALL: "User/getuserDetails",
        GET_BY_ID: (id: number | string) =>`/User/getuserdetailbyid?userid=${id}`,
        CREATE_User: "User/SetUserMaster",
        UPDATE: "User/Updateuserdetails",
        DELETE: (id: number | string) =>`/users/${id}`,
        GET_all_role: "User/getroledetails",
        GET_all_branches: "User/getbranchdetails",
    },
};