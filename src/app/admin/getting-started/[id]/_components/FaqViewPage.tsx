"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useState } from "react";
import FaqEditModal from "./FaqEditModal";
import { FaqData } from "@/_data/sample/FaqData";


export default function FaqViewPage({ id }: { id: string | number }) {
  const newsItem = FaqData.find(i => i.id === parseInt(id as string));
  
  // Use newsItem directly if it exists, otherwise provide a default structure 
  // (though in a real app, you'd navigate away or show a 404).
  const [data, setData] = useState(newsItem); 
  const [isModal, setIsModal] = useState(false);

  if (!data) {
    return (
      <section className="w-[92%] mx-auto py-12">
        <TitlePrimary title='Faq Item Not Found' />
        <p className="text-lg text-red-600">The news item with ID: {id} could not be located.</p>
      </section>
    );
  }

  return (
    <>
    <section className="w-[92%] mx-auto">
       <SpacerTertiary />
      <TitlePrimary title='View Faq' />
      <SpacerTertiary />
      <div className="flex items-center justify-end">
        <ButtonPrimary title="Edit Faq" onClick={() => setIsModal(true)} />
      </div>
      <SpacerTertiary />
      
      <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-2 rounded-xl">
        {/* Corrected fields to match FaqInterface */}
        <RecordPrimary label="Question:" value={data.question} />
        <RecordPrimary label="Answer:" value={data.answer} />       
      </div>
      <SpacerTertiary />
    </section>

    {/* Note: The modal is only shown if isModal is true */}
    <FaqEditModal isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}

