"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useState } from "react";
import ScheduleEditModal from "./ScheduleEditModal";
import { ScheduleData } from "@/_data/sample/ScheduleData";


export default function ScheduleViewPage({ id }: { id: string | number }) {
  const newsItem = ScheduleData.find(i => i.id === parseInt(id as string));
  
  // Use newsItem directly if it exists, otherwise provide a default structure 
  // (though in a real app, you'd navigate away or show a 404).
  const [data, setData] = useState(newsItem); 
  const [isModal, setIsModal] = useState(false);

  if (!data) {
    return (
      <section className="w-[92%] mx-auto py-12">
        <TitlePrimary title='Schedule Item Not Found' />
        <p className="text-lg text-red-600">The news item with ID: {id} could not be located.</p>
      </section>
    );
  }

  return (
    <>
    <section className="w-[92%] mx-auto">
       <SpacerTertiary />
      <TitlePrimary title='View Schedule' />
      <SpacerTertiary />
      <div className="flex items-center justify-end">
        <ButtonPrimary title="Edit Schedule" onClick={() => setIsModal(true)} />
      </div>
      <SpacerTertiary />
      
      <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-2 rounded-xl">
        {/* Corrected fields to match ScheduleInterface */}
        <RecordPrimary label="Time:" value={data.time} />
        <RecordPrimary label="Date:" value={data.createdAt} />       
        <RecordPrimary label="User:" value={data.userId.toString()} />       
        <RecordPrimary label="Center:" value={data.center} />       
      </div>
      <SpacerTertiary />
    </section>

    {/* Note: The modal is only shown if isModal is true */}
    <ScheduleEditModal isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}

