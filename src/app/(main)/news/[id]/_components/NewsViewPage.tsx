"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { BaseURL } from "@/_api/BaseURL"
import FormContactTertiary from "@/_components/forms/FormContactTertiary"
import Heading2 from "@/_components/headings/Heading2"
import Heading3 from "@/_components/headings/Heading3"
import SpacerQuaternary from "@/_components/spacers/SpacerQuaternary"
import { NewsInterface } from "@/_data/entity/NewsEntity"
import { useNewsStore } from "@/_store/useNewsStore"





export default function NewsViewPage({id, dbData}: {id: string | number, dbData: NewsInterface}) {
   const [isModal, setIsModal] = useState<boolean>(false)
    const {data, setImage, preData, setData} = useNewsStore()
    
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
        <Heading2 title={data?.title ?? ""} />
        <SpacerQuaternary />
        <div className="bg-gray-500 overflow-hidden drop-shadow rounded-2xl aspect-[5/4]">
          <Image 
            src={data?.imageURL ?? ""} 
            width={1000} 
            height={800} 
            alt={data?.title ?? ""} 
            className="object-cover w-full h-full" />
        </div>
        <SpacerQuaternary />
        <div className="text-lg font-light">{data?.content}</div>
        <SpacerQuaternary />
      </div>

      <div className="w-[30%]">
        <Heading3 title="Talk to us" />
        <SpacerQuaternary />
        <FormContactTertiary title={data?.title} />
      </div>

    </section>
    </>
  )
}
