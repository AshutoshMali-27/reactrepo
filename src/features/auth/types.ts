export interface LoginRequests {
    userName: string;
    password: string;
}

export interface User {
    userID: number;
    userName: string;
    email: string;
    phoneNumber: string;
    roleID: number;
}


export interface LoginResponse {
    userId: number;
    userName: string;
    email: string;
    roleId: number;
    roleName: string;
}