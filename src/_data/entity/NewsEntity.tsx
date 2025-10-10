import { UserEntity, UserInterface } from "./UserEntity";

export interface NewsInterface {
    id: number,
    title: string,
    content: string,
    author: string,
    priority: number | string,
    image?: File | null,
    newImage?: File | null,
    imageURL?: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    user: UserInterface,
}


export const NewsEntity = {
    id: 0,
    title: "",
    content: "",
    author: "",
    priority: 0,
    image: null,
    newImage: null,
    imageURL: "",
    status: "", // Published, Draft, Archived
    createdAt: "",
    updatedAt: "",
    user: UserEntity
}



