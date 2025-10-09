export interface AuthInterface{
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    roleLevel: number,
    role: string,
    isSubmit: boolean,
    code: string,
    isAdmin: number
}


export const AuthEntity = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    address: "",
    roleLevel: 0,
    role: "",
    isSubmit: false,
    code: "",
    isAdmin: 0,
}