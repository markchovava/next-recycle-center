"use client"

import { IoSettingsOutline } from "react-icons/io5"
import { FaRegUser } from "react-icons/fa";
import { MdRecycling } from "react-icons/md";
import { BsBuildings } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import Link from "next/link";

interface CardPrimaryProps{
    id: number,
    href: string,
    title: string,
    desc: string,
    iconType: string,
    css: string
}

export default function CardPrimary({dbData}: { dbData: CardPrimaryProps }) {
    const {id, href, title, desc, iconType, css} = dbData
    
    const icon = () => (
        iconType === "settings" ? 
            <IoSettingsOutline className="text-[3.5rem]" /> : 
        iconType === "users" ?   
            <FaUsers className="text-[3.5rem]" /> : 
        iconType === "recycling" ?
            <MdRecycling className="text-[3.5rem]" /> : 
        iconType === "user" ?
            <FaRegUser className="text-[3.5rem]" /> : 
        iconType === "faq" ?
            <FaQuoteLeft className="text-[3.5rem]" /> : 
        iconType === "contact" ?
            <RiContactsLine className="text-[3.5rem]" /> : 
        iconType === "news" ?
            <FaRegNewspaper className="text-[3.5rem]" /> : 
        iconType === "info" ?
            <BsInfoCircle className="text-[3.5rem]" /> : 
        iconType === "calendar" ?
            <FaRegCalendarAlt className="text-[3.5rem]" /> : 
        iconType === "help" ?
            <BiHelpCircle className="text-[3.5rem]" /> : 
        iconType === "location" ?
            <BsBuildings className="text-[3.5rem]" /> : 
        null
    )

  return (
    <Link href={href}>
    <div className={`${css} h-[8rem] hover:drop-shadow-lg ease-initial transition-all duration-200 cursor-pointer 
        flex gap-3 items-center justify-start bg-white drop-shadow rounded-xl p-3`}>
        <div className="w-[20%]">
           {icon()}
        </div>
        <div className="flex-1">
            <h3 className="text-[1.3rem] leading-tight font-bold">
                {title}
            </h3>
            <p className="italic text-xs">
                {desc}
            </p>
        </div>
    </div>
    </Link>
  )
}
