export interface User {
    id: string;
    fullname: string;
    username: string;
    email: string;
    token: string;
    birthday: string;
    phoneNumber: string;
    status: string;
    role: string[];
}

export interface AddUserDTO {
    name: string,
    phoneNumber: string,
    email: string,
    birthday: Date,
    roleId: number;
}

export interface UserDTO {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    birthday: Date;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    roleId: number;
}

export interface UpdateUserDTO {
    name: string;
    phoneNumber: string;
    email: string;
    birthday: Date;
    status: UserStatus;
    roleId: number;
}

export interface UserLoginFormValues {
    email: string;
    password: string;
}

export interface UserAdminDTO {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    birthday: Date;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    roleId: number;
}

export enum UserStatus {
    Active = 1,
    InActive = 2,
    Banned = 3
}

export enum Role{
    Admin = 2,
    Client = 1
}