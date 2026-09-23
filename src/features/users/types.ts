export interface User{
    userID: number;
    userName: string;
    email: string;
    passwordHash: string;
    phoneNumber: string;
    createdDate: string;
    branchCode:string;
    isActive:number;
    roleId:number;
}
export interface userCreate{
    userName: string;
    email: string;
    passwordHash: string;
    phoneNumber: string;
    createdDate: string;
    branchCode:string;
    isActive:number;
    roleId:number;
}
export interface userUpdate{
    userID: number;
    userName: string;
    email: string;
    passwordHash: string;
    phoneNumber: string;
    createdDate: string;
    branchCode:string;
    isActive:number;
    roleId:number;
}

export interface roles{
    roleID:number,
    roleName:string,
    isActive:boolean
}

export interface branches{
    branchId:number,
    branchCode:string,
    branchName:string,
    isActive:boolean
}