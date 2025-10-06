"use client"
import { IoSettingsOutline } from "react-icons/io5";
import Heading2 from "@/_components/headings/Heading2"
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import { DashboardData } from "@/_data/sample/DashboardData";
import CardPrimary from "@/_components/cards/CardPrimary";

export default function AdminPage() {
  return (
    <section className="mx-auto w-[92%]">
        <div>
            <Heading2 title="Admin Dashboard" />
            <hr className="border-b border-green-700 mt-2" />
        </div>

        <SpacerTertiary />
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
            {DashboardData.map((i, key) => (
                <CardPrimary key={key} dbData={i} />
            ))}
        </div>
    </section>
  )
}
