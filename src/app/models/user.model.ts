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

export interface UserLoginFormValues {
    email: string;
    password: string;
}