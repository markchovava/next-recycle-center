"use client"

import FormContactTertiary from "@/_components/forms/FormContactTertiary"
import Heading2 from "@/_components/headings/Heading2"
import Heading3 from "@/_components/headings/Heading3"
import SpacerQuaternary from "@/_components/spacers/SpacerQuaternary"
import { CenterData } from "@/_data/sample/CenterData"
import { NewsData } from "@/_data/sample/NewsData"
import Image from "next/image"
import { useState } from "react"




export default function CenterViewPage({id}: {id: string | number}) {
  const item = CenterData.find(i => i.id === parseInt(id as string));
  const [data, setData] = useState(item)


  return (
    <>
    <section className="mx-auto w-[80%] flex justify-start items-start gap-6">
      <div className="w-[70%]">
        <Heading2 title={data?.name ?? ""} />
        <SpacerQuaternary />
        <div className="bg-gray-500 overflow-hidden drop-shadow rounded-2xl aspect-[5/4]">
          <Image 
            src={data?.img ?? ""} 
            width={1000} 
            height={800} 
            alt={data?.name ?? ""} 
            className="object-cover w-full h-full" />
        </div>
        <SpacerQuaternary />
        <div className="text-lg font-light">{data?.description}</div>
        <SpacerQuaternary />
      </div>

      <div className="w-[30%]">
        <Heading3 title="Talk to us" />
        <SpacerQuaternary />
        <FormContactTertiary />
      </div>

    </section>
    </>
  )
}
