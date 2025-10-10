import { UserEntity, UserInterface } from "./UserEntity"

export interface GettingStartedInterface {
    id: number,
    userId: number,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    user: UserInterface
}


export const GettingStartedEntity = {
    id: 0,
    userId: 0,
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    user: UserEntity
}