"use client"

import Image from "next/image"

interface ImagePrimaryInterface{
    label: string,
    src: string,
}

export default function ImagePrimary({src, label}: ImagePrimaryInterface) {
  return (
    <div className='w-[100%] flex lg:flex-row flex-col text-lg lg:gap-2'>
        <div className='md:w-[16%] w-full font-light'>{label}</div>
        <div className='flex-1'>
            <div className="lg:w-[50%] w-[70%] aspect-[5/4] relative rounded-xl overflow-hidden bg-white drop-shadow">
                <Image 
                    src={src} 
                    fill
                    className="object-cover" 
                    alt={label || "Image"} 
                />
            </div>
        </div>
    </div>
  )
}