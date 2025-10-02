"use client"

import Link from "next/link"
import Heading2 from "../headings/Heading2"

interface TitleTertiaryInterface{
    title: string, 
    btnTitle: string,
    btnHref: string,
}

export default function TitleTertiary({title, btnTitle="", btnHref}: TitleTertiaryInterface) {
  return (
    <>
    <div className="flex items-center justify-between p-2">
        <Heading2 title={title} />
        {btnHref &&
        <Link href={btnHref}>
            <button className="cursor-pointer hover:underline ease-initial duration-200 transition-all">
                {btnTitle}
            </button>
        </Link>
        }
    </div>
    <hr className="border-b border-green-600 mt-2" />
    </>
  )
}
