import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { UserEntity, UserInterface } from "./UserEntity"

export interface CenterInterface{
    id: number,
    userId: number,
    name: string,
    phone: string,
    email: string,
    address: string,
    longitude: string,
    latitude: string,
    description: string,
    city: string,
    province: string,
    postalCode: string,
    weekdayOpenTime: string,
    weekdayCloseTime: string,
    weekendOpenTime: string,
    weekendCloseTime: string,
    holidayOpenTime: string,
    holidayCloseTime: string,
    createdAt: string,
    updatedAt: string,
    image?: File | null,
    newImage?: File | null,
    imageURL?: string,
    user: UserInterface
}


export const CenterEntity = {
    id: 0,
    userId: 0,
    name: "",
    phone: "",
    email: "",
    address: "",
    longitude: "",
    latitude: "",
    description: "",
    city: "",
    province: "",
    postalCode: "",
    weekdayOpenTime: "",
    weekdayCloseTime: "",
    weekendOpenTime: "",
    weekendCloseTime: "",
    holidayOpenTime: "",
    holidayCloseTime: "",
    image: null,
    newImage: null,
    imageURL: "",
    createdAt: "",
    updatedAt: "",
    user: UserEntity
}

