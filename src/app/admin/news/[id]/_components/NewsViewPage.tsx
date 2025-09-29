"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useState } from "react";
import NewsEditModal from "./NewsEditModal";
import { NewsData } from "@/_data/sample/NewsData";


export default function NewsViewPage({ id }: { id: string | number }) {
  const newsItem = NewsData.find(i => i.id === parseInt(id as string));
  
  // Use newsItem directly if it exists, otherwise provide a default structure 
  // (though in a real app, you'd navigate away or show a 404).
  const [data, setData] = useState(newsItem); 
  const [isModal, setIsModal] = useState(false);

  if (!data) {
    return (
      <section className="w-[92%] mx-auto py-12">
        <TitlePrimary title='News Item Not Found' />
        <p className="text-lg text-red-600">The news item with ID: {id} could not be located.</p>
      </section>
    );
  }

  return (
    <>
    <section className="w-[92%] mx-auto">
       <SpacerTertiary />
      <TitlePrimary title='View News' />
      <SpacerTertiary />
      <div className="flex items-center justify-end">
        <ButtonPrimary title="Edit News" onClick={() => setIsModal(true)} />
      </div>
      <SpacerTertiary />
      
      <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-2 rounded-xl">
        {/* Corrected fields to match NewsInterface */}
        <RecordPrimary label="Title:" value={data.title} />
        <RecordPrimary label="Status:" value={data.publish} />
        <RecordPrimary label="Priority:" value={data.priority.toString()} />
        <RecordPrimary label="Created On:" value={data.createdAt} />
        <RecordPrimary label="Last Updated:" value={data.updatedAt} />

        <SpacerTertiary />
        {/* Displaying the main content/details in a separate block for better reading */}
        <div className="pt-4 border-t border-gray-200 w-full">
            <h3 className="font-light text-lg text-gray-700 mb-2">Content Details</h3>
            <p className="text-gray-800 text-lg whitespace-pre-wrap">{data.details}</p>
        </div>
      </div>
      <SpacerTertiary />
    </section>

    {/* Note: The modal is only shown if isModal is true */}
    <NewsEditModal isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}

