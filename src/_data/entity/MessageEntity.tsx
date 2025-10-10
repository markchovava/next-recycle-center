import { UserEntity, UserInterface } from "./UserEntity"

export interface MessageInterface {
    id: number,
    userId: number,
    email: string,
    message: string,
    name: string,
    title: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    user: UserInterface
}



export const MessageEntity = {
    id: 0,
    userId: 0,
    email: "",
    message: "",
    name: "",
    title: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    user: UserEntity
}