import { UserEntity, UserInterface } from "./UserEntity"

export interface FaqInterface {
    id: number,
    userId: number,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
    user: UserInterface
}


export const FaqEntity = {
    id: 0,
    userId: 0,
    question: "",
    answer: "",
    createdAt: "",
    updatedAt: "",
    user: UserEntity
}