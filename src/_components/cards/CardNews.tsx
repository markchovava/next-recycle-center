"use client"
import { trimString } from "@/_utils/StringManipulation";
import Image from "next/image";
import Link from "next/link";


interface CardNewsInterface{
    img: string,
    title?: string,
    id?: number,
    
}


export default function CardNews(
    { dbData }
    : { dbData: CardNewsInterface }
) {
    const {id, img= "/assets/img/no_photo.jpg", title} = dbData


  return (
    <div className='group bg-white text-black text-2xl rounded-lg overflow-hidden pb-4'>
        <div className='aspect-[5/4] bg-gray-300 w-full border-b border-gray-300 relative overflow-hidden'>
            <Image 
                src={img} 
                width={800} 
                height={640} 
                className="ease-initial transition-all duration-200 hover:scale-110" 
                alt={name ?? ""} 
            />
        </div>
        <div className='p-4 flex flex-col'>
            <Link href={`/news/${id}`}>
                <h3 className='cursor-pointer leading-tight ease-initial transition-all duration-300 group-hover:underline'>
                    {trimString(title, 20)}
                </h3>
            </Link>
        </div>
    </div>
  )
}
