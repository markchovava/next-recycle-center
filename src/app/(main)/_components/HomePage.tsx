"use client"

import CardSecondary from "@/_components/cards/CardSecondary"
import SpacerTertiary from "@/_components/spacers/SpacerTertiary"
import TitlePrimary from "@/_components/titles/TitlePrimary"
import { AboutData } from "@/_data/sample/AboutData"

export default function HomePage() {
  return (
    <section className="w-full">
        <div className="mx-auto lg:w-[80%] w-[92%]">
            <TitlePrimary title="Our Solutions" />
            <SpacerTertiary />
            <div className="grid grid-cols-2 gap-4">
                {AboutData.solutions.items.map((i, key) => (
                    <CardSecondary key={key} dbData={i} />
                ))}
            </div>
        </div>
   </section>
  )
}
