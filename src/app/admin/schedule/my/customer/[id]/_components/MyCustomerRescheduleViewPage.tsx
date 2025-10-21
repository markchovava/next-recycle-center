"use client"
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useEffect, useState } from "react";
import { ScheduleInterface } from "@/_data/entity/ScheduleEntity";
import { useScheduleStore } from "@/_store/useScheduleStore";
import LoaderPrimary from "@/_components/loaders/LoaderPrimary";
import { formatDate } from "@/_utils/formatDate";
import StickerPrimary from "@/_components/stickers/StickerPrimary";



interface CustomerScheduleInterface{
  id: string | number, 
  dbData: ScheduleInterface
}

/* ------------------------------ */
const title = "View Schedule"
/* ------------------------------ */


export default function MyCustomerScheduleViewPage({ id, dbData }: CustomerScheduleInterface) {
    const {data, preData, setData, isLoading} = useScheduleStore()
    console.log('dbData', dbData)
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
      <TitlePrimary title={title} />
      <SpacerTertiary />
      <div className="flex items-center justify-end">
       {/*  <ButtonPrimary title="Edit Schedule" onClick={() => setIsModal(true)} /> */}
      </div>

      <SpacerTertiary />
      <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-2 rounded-xl">
        {/* Corrected fields to match ScheduleInterface */}
        <RecordPrimary label="Customer Status:" value={data.customerStatus ? <StickerPrimary status={data.customerStatus} /> : "Not Added"} />
        <RecordPrimary label="Customer Name:" value={data.customerName ?? "Not Added"} />       
        <RecordPrimary label="Customer Phone:" value={data.customerPhone ?? "Not Added"} />       
        <RecordPrimary label="Customer Address:" value={data.customerAddress ?? "Not Added"} />       
        <RecordPrimary label="Request Time:" value={preData.requestTime ?? "Not Added"} />
        <RecordPrimary label="Request Date:" value={preData.requestDate ? formatDate(preData.requestDate) : "Not Added"} />       
        <RecordPrimary label="Center Name:" value={preData.centerName ?? "Not Added"} />       
        <RecordPrimary label="Center Phone:" value={preData.centerPhone ?? "Not Added"} />       
        <RecordPrimary label="Center Address:" value={data.centerAddress ?? "Not Added"} />   


        <RecordPrimary label="Recycler Time:" value={data.collectionTime ?? "Not Added"} /> 
        <RecordPrimary label="Recycler Date:" value={data.collectionDate ? formatDate(data.collectionDate) : "Not Added"} /> 
        <RecordPrimary label="Recycler Name:" value={data.recyclerName ?? "Not Added"} /> 
        <RecordPrimary label="Recycler Phone:" value={data.recyclerPhone ?? "Not Added"} /> 
        <RecordPrimary label="Recycler Address:" value={data.recyclerAddress ?? "Not Added"} /> 
        <RecordPrimary label="Recycler Status:" value={data.recyclerStatus ? <StickerPrimary status={data.recyclerStatus} /> : "Not Added"} /> 
      </div>
      <SpacerTertiary />
      
    </section>

   
    </>
  )
}

