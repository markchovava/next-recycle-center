"use client"
import { BaseURL } from "@/_api/BaseURL";
import { CenterInterface } from "@/_data/entity/CenterEntity";
import { trimString } from "@/_utils/StringManipulation";
import Image from "next/image";
import Link from "next/link";





export default function CardCenter({dbData}: {dbData: CenterInterface}) {
    const {id, image, imageURL, name, city} = dbData
    const noImage = "/assets/img/no_photo.jpg"

    console.log("CardCenter", imageURL)


  return (
    <div className='lg:h-[21rem] h-auto group bg-white text-black text-2xl rounded-lg overflow-hidden pb-4'>
        <div className='aspect-[5/4] bg-gray-300 w-full border-b border-gray-300 relative overflow-hidden'>
            <Image 
                src={imageURL ?  BaseURL + imageURL : noImage}
                width={800} 
                height={640} 
                className="ease-initial transition-all duration-200 hover:scale-110" 
                alt={name ?? ""} />
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
