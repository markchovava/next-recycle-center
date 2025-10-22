"use client"
import { getTheCookie, UserCookieName } from "@/_cookies/CookiesClient"
import { UserEntity, UserInterface } from "@/_data/entity/UserEntity"
import { create } from "zustand"


interface AccessInterface{
    currentUser: UserInterface,
    isLoading: boolean,
    setCurrentUser: (data: UserInterface) => void,
    getUserCookie: () => Promise<void>, 
}


export const useAccessStore = create<AccessInterface>((set, get) => ({
    currentUser: UserEntity,
    isLoading: true,
    setCurrentUser: (data) => {
        set({
            currentUser: data
        })
    },
    getUserCookie: async () => {
        const theCookie = await getTheCookie(UserCookieName)
        if(theCookie) {
            const parsedCookie = await JSON.parse(theCookie as string) as UserInterface
            set({
                currentUser: parsedCookie,
                isLoading: false,
            })
        } else {
            set({
                currentUser: UserEntity,
                isLoading: false,
            })
        }   
    },

}))