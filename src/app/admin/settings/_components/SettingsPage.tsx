"use client"

import CardPrimary from "@/_components/cards/CardPrimary"
import SpacerTertiary from "@/_components/spacers/SpacerTertiary"
import TitlePrimary from "@/_components/titles/TitlePrimary"
import { SettingsData } from "@/_data/sample/SettingsData"

export default function SettingsPage() {
  return (
    <>
    <section className="mx-auto w-[92%]">
        <TitlePrimary title="Settings" />
        <SpacerTertiary />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            {SettingsData.map((i, key) => (
                <CardPrimary key={key} dbData={i} />
            ))}
        </div>
    </section>
    </>
  )
}
