"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useEffect, useState } from "react";
import MessageEditModal from "./MessageEditModal";
import { useMessageStore } from "@/_store/useMessageStore";
import { formatDate } from "@/_utils/formatDate";
import { MessageInterface } from "@/_data/entity/MessageEntity";
import RecordSecondary from "@/_components/records/RecordSecondary";



interface MessageViewPageInterface{
  id: string | number, 
  dbData: MessageInterface
} 

 

export default function MessageViewPage({ id, dbData }: MessageViewPageInterface) {
    const [isModal, setIsModal] = useState<boolean>(false)
    const {data, preData, setData} = useMessageStore()

    useEffect(() => {
      setData(dbData)
    }, [])


    return (
      <>
      <section className="w-[92%] mx-auto">
        <SpacerTertiary />
        <TitlePrimary title='View Message' />
        <SpacerTertiary />
        <div className="flex items-center justify-end">
          <ButtonPrimary title="Edit Message" onClick={() => setIsModal(true)} />
        </div>
        <SpacerTertiary />
        
        <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-2 rounded-xl">
          {/* Corrected fields to match MessageInterface */}
          <RecordPrimary label="Name:" value={preData.name ?? "Not Added"} />      
          <RecordSecondary label="Status:" value={preData.status ?? "Not Added"} />
          <RecordPrimary label="Email:" value={preData.email ?? "Not Added"} />   
          <RecordPrimary label="Title:" value={preData.title ?? "Not Added"} />       
          <RecordPrimary label="Message:" value={preData.message ?? "Not Added"} />       
          <RecordPrimary label="Created:" value={formatDate(preData.createdAt) ?? "Not Added"} />       
          <RecordPrimary label="Updated:" value={formatDate(preData.updatedAt) ?? "Not Added"} />       
        </div>
        <SpacerTertiary />
      </section>

      
      <MessageEditModal id={id} isModal={isModal} setIsModal={setIsModal} />
      </>
    )
}

