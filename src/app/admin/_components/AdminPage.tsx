"use client"
import { IoSettingsOutline } from "react-icons/io5";
import Heading2 from "@/_components/headings/Heading2"
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import { DashboardData } from "@/_data/sample/DashboardData";
import CardPrimary from "@/_components/cards/CardPrimary";
import { getTheCookie, UserCookieName } from "@/_cookies/CookiesClient";
import { useEffect, useState } from "react";
import { AuthEntity } from "@/_data/entity/AuthEntity";
import { UserEntity } from "@/_data/entity/UserEntity";
import { useAccessStore } from "@/_store/useAccessStore";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import LoaderPrimary from "@/_components/loaders/LoaderPrimary";



const title = "Admin Dashboard"


export default function AdminPage() {
    const { currentUser, setCurrentUser, getUserCookie, isLoading} = useAccessStore()

    useEffect(() => {
      getUserCookie()
    }, [])

    if (isLoading) {
        return (
          <section className="w-[92%] mx-auto">
            <TitlePrimary title={title} />
            <SpacerTertiary />
            <LoaderPrimary />
          </section>
        );
    }


  return (
    <section className="mx-auto w-[92%]">
        <div>
            <Heading2 title={title} />
            <hr className="border-b border-green-700 mt-2" />
        </div>

        <SpacerTertiary />
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
            {DashboardData.map((i, key) => {
              // Hide "Users" card if user is not admin
              if (currentUser?.isAdmin === "0" && i.title === "Users") {
                return null
              }
              return <CardPrimary key={key} dbData={i} />
            })}
        </div>
    </section>
  )
}
