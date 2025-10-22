"use client"
import CardPrimary from "@/_components/cards/CardPrimary";
import LoaderPrimary from "@/_components/loaders/LoaderPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { HelpData } from "@/_data/sample/HelpData";
import { useAccessStore } from "@/_store/useAccessStore";
import { useEffect } from "react";



const title = "Help"

export default function HelpPage() {
    const { currentUser, getUserCookie, isLoading} = useAccessStore()
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
    <>
    <section className="mx-auto w-[92%]">
        <TitlePrimary title={title} />
        <SpacerTertiary />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            {HelpData.map((i, key) => {
              // Hide "Users" card if user is not admin
              if (currentUser?.isAdmin === "0" && i.title === "Messages") {
                return null
              }
              return <CardPrimary key={key} dbData={i} />
            })}
        </div>
    </section>
    </>
  )
}
