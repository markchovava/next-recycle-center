"use client"

import { BaseURL } from "@/_api/BaseURL"
import FormContactTertiary from "@/_components/forms/FormContactTertiary"
import Heading2 from "@/_components/headings/Heading2"
import Heading3 from "@/_components/headings/Heading3"
import RecordPrimary from "@/_components/records/RecordPrimary"
import SpacerQuaternary from "@/_components/spacers/SpacerQuaternary"
import { CenterInterface } from "@/_data/entity/CenterEntity"
import { CenterData } from "@/_data/sample/CenterData"
import { NewsData } from "@/_data/sample/NewsData"
import { useCenterStore } from "@/_store/useCenterStore"
import Image from "next/image"
import { useEffect, useState } from "react"


interface CenterViewPageInterface{
    id: string | number,
    dbData: CenterInterface,
}


export default function CenterViewPage({id, dbData}: CenterViewPageInterface) {
  const noImage = "/assets/img/no_photo.jpg"
    // Find the center item using the ID
    const {
        data, 
        preData, 
        setData, 
        isLoading, 
        setImage
    } = useCenterStore()

    useEffect(() => {
        setData(dbData)
        const img = dbData.image ? (BaseURL + dbData.image) : "";
        if (img) {
          setImage(img)
        }
      }, [])

  return (
    <>
    <section className="mx-auto w-[80%] flex justify-start items-start gap-6">
      <div className="w-[70%]">
        <Heading2 title={data?.name ?? ""} />
        <SpacerQuaternary />
        <div className="bg-gray-500 overflow-hidden drop-shadow rounded-2xl aspect-[5/4]">
          <Image 
            src={preData.imageURL ? preData.imageURL : noImage} 
            width={1000} 
            height={800} 
            alt={data?.name ?? ""} 
            className="object-cover w-full h-full" />
        </div>
        <SpacerQuaternary />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pb-4">
            <RecordPrimary label="Weekday Hours:" value={`${preData.weekdayOpenTime?? "--:--"} - ${preData.weekdayCloseTime ?? "--:--"}`} />
            <RecordPrimary label="Weekend Hours:" value={`${preData.weekendOpenTime?? "--:--"} - ${preData.weekendCloseTime ?? "--:--"}`} />
            <RecordPrimary label="Holiday Hours:" value={
              preData.holidayOpenTime === "00:00" && preData.holidayCloseTime === "00:00" 
              ? "Closed" 
              : `${preData.holidayOpenTime ?? "--:--"} - ${preData.holidayCloseTime ?? "--:--"}`
            } />
          </div>
        <SpacerQuaternary />
        <div className="text-lg font-light">{data?.description}</div>
        <SpacerQuaternary />
      </div>

      <div className="w-[30%]">
        <Heading3 title="Talk to us" />
        <SpacerQuaternary />
        <FormContactTertiary title={data?.name} />
      </div>

    </section>
    </>
  )
}
