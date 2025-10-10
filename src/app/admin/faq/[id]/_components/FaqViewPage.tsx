"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useEffect, useState } from "react";
import FaqEditModal from "./FaqEditModal";
import { FaqInterface } from "@/_data/entity/FaqEntity";
import { useFaqStore } from "@/_store/useFaqStore";


interface FaqViewPageInterface{
  id: string | number, 
  dbData: FaqInterface
} 

export default function FaqViewPage({ id, dbData }: FaqViewPageInterface) {
    const [isModal, setIsModal] = useState<boolean>(false)
    const {data, preData, setData} = useFaqStore()
    useEffect(() => {
      setData(dbData)
    }, [])
 

  return (
    <>
    <section className="w-[92%] mx-auto">
       <SpacerTertiary />
      <TitlePrimary title='View FAQ' />
      <SpacerTertiary />
      <div className="flex items-center justify-end">
        <ButtonPrimary title="Edit Faq" onClick={() => setIsModal(true)} />
      </div>
      <SpacerTertiary />
      
      <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-2 rounded-xl">
        {/* Corrected fields to match FaqInterface */}
        <RecordPrimary label="Question:" value={preData?.question ?? "Not Added"} />
        <RecordPrimary label="Answer:" value={preData?.answer ?? "Not Added"} />       
      </div>
      <SpacerTertiary />
    </section>

    {/* Note: The modal is only shown if isModal is true */}
    <FaqEditModal id={id} isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}

