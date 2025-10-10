"use client"
import { JSX } from "react"


interface RecordPrimaryProps{
    label: string,
    value: string | JSX.Element | number
}

export default function RecordSecondary({label, value}: RecordPrimaryProps) {
  
    return (
        <div className='w-[100%] flex lg:flex-row flex-col text-lg lg:gap-2'>
            <div className='md:w-[16%] w-full font-light'>{label}</div>
            <div className='flex-1'>
                <span className="px-2 py-1 rounded-full text-white bg-gray-600">{value}</span>
            </div>
        </div>
    )

}
