"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useEffect, useState } from "react";
import ScheduleEditModal from "./RecyclerScheduleEditModal";
import { useScheduleStore } from "@/_store/useScheduleStore";
import LoaderPrimary from "@/_components/loaders/LoaderPrimary";
import StickerPrimary from "@/_components/stickers/StickerPrimary";
import { formatDate } from "@/_utils/formatDate";
import { ScheduleInterface } from "@/_data/entity/ScheduleEntity";



interface RecyclerScheduleInterface{
  id: string | number, 
  dbData: ScheduleInterface
}


/* ------------------------------ */
const title = "View Schedule"
/* ------------------------------ */


export default function RecyclerScheduleViewPage({ id, dbData }: RecyclerScheduleInterface) {
    const [isModal, setIsModal] = useState(false)
    const {data, preData, setData, isLoading} = useScheduleStore()
    useEffect(() => {
      setData(dbData)
    }, [])

    if (isLoading) {
      return (
        <section className="w-[92%] mx-auto">
          <TitlePrimary title={title} />
          <SpacerTertiary />
          <LoaderPrimary />
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
        <RecordPrimary label="Customer Status:" value={preData.customerStatus ? <StickerPrimary status={preData.customerStatus} /> : "Not Added"} />
        <RecordPrimary label="Customer Name:" value={preData.customerName ?? "Not Added"} />       
        <RecordPrimary label="Customer Phone:" value={preData.customerPhone ?? "Not Added"} />       
        <RecordPrimary label="Customer Address:" value={preData.customerAddress ?? "Not Added"} />       
        <RecordPrimary label="Request Time:" value={preData.requestTime ?? "Not Added"} />
        <RecordPrimary label="Request Date:" value={preData.requestDate ? formatDate(preData.requestDate) : "Not Added"} />       
        <RecordPrimary label="Center Name:" value={preData.centerName ?? "Not Added"} />       
        <RecordPrimary label="Center Phone:" value={preData.centerPhone ?? "Not Added"} />       
        <RecordPrimary label="Center Address:" value={preData.centerAddress ?? "Not Added"} />   
        <RecordPrimary label="Recycler Time:" value={preData.collectionTime ?? "Not Added"} /> 
        <RecordPrimary label="Recycler Date:" value={preData.collectionDate ? formatDate(preData.collectionDate) : "Not Added"} /> 
        <RecordPrimary label="Recycler Name:" value={preData.recyclerName ?? "Not Added"} /> 
        <RecordPrimary label="Recycler Phone:" value={preData.recyclerPhone ?? "Not Added"} /> 
        <RecordPrimary label="Recycler Address:" value={preData.recyclerAddress ?? "Not Added"} /> 
        <RecordPrimary label="Recycler Status:" value={preData.recyclerStatus ? <StickerPrimary status={preData.recyclerStatus} /> : "Not Added"} /> 
      </div>
      <SpacerTertiary />

    </section>

    {/* Note: The modal is only shown if isModal is true */}
    <ScheduleEditModal id={id} isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}

