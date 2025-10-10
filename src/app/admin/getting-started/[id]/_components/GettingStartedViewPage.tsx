"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useEffect, useState } from "react";
import GettingStartedEditModal from "./GettingStartedEditModal";
import { GettingStartedInterface } from "@/_data/entity/GettingStartedEntity";
import { useGettingStartedStore } from "@/_store/useGettingStartedStore";


interface GettingStartedViewPageInterface{
  id: string | number, 
  dbData: GettingStartedInterface
} 

export default function GettingStartedViewPage({ id, dbData }: GettingStartedViewPageInterface) {
  const [isModal, setIsModal] = useState<boolean>(false)
    const {data, preData, setData} = useGettingStartedStore()
    useEffect(() => {
      setData(dbData)
    }, [])
 

  return (
    <>
    <section className="w-[92%] mx-auto">
       <SpacerTertiary />
      <TitlePrimary title='View Getting Started' />
      <SpacerTertiary />
      <div className="flex items-center justify-end">
        <ButtonPrimary title="Edit GettingStarted" onClick={() => setIsModal(true)} />
      </div>
      <SpacerTertiary />
      
      <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-2 rounded-xl">
        {/* Corrected fields to match GettingStartedInterface */}
        <RecordPrimary label="Title:" value={preData.title ?? "Not Added"} />
        <RecordPrimary label="Content:" value={preData.content ?? "Not Added"} />       
      </div>
      <SpacerTertiary />
    </section>

    {/* Note: The modal is only shown if isModal is true */}
    <GettingStartedEditModal id={id} isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}

