"use client"
import { trimString } from "@/_utils/StringManipulation";
import Image from "next/image";
import Link from "next/link";


interface CardCenterInterface{
    img: string,
    name?: string,
    city?: string,
    id?: number,
    
}


export default function CardCenter({dbData}: {dbData: CardCenterInterface}) {
    const {id, img="/assets/img/no_photo.jpg", name, city} = dbData


  return (
    <div className='h-[21rem] group bg-white text-black text-2xl rounded-lg overflow-hidden pb-4'>
        <div className='aspect-[5/4] bg-gray-300 w-full border-b border-gray-300 relative overflow-hidden'>
            <Image 
                src={img} 
                width={800} 
                height={640} 
                className="ease-initial transition-all duration-200 hover:scale-110" alt={name ?? ""} />
        </div>
        <div className='px-3 py-3 flex flex-col'>
        <Link href={`/center/${id}`}>
            <h3 className='cursor-pointer ease-initial transition-all duration-300 group-hover:underline'>
                {trimString(name, 20)}
            </h3>
        </Link>
        <p className='text-lg'>
            {trimString(city, 20)}
        </p>  
        </div>
    </div>
  )
}
