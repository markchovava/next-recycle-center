import CardPrimary from "@/_components/cards/CardPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { ScheduleNavData } from "@/_data/sample/ScheduleData";




export default function SchedulePage() {
  return (
    <>
    <section className="mx-auto w-[92%]">
        <TitlePrimary title="Schedule" />
        <SpacerTertiary />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            {ScheduleNavData.map((i, key) => (
                <CardPrimary key={key} dbData={i} />
            ))}
        </div>
    </section>
    </>
  )
}
