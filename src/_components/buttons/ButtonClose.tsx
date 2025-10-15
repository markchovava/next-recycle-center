"use client"

import { IoClose } from "react-icons/io5"


interface ButtonCloseInterface {
    onClick: () => void
}


export default function ButtonClose({ onClick }: ButtonCloseInterface) {
  return (
    <button 
        onClick={onClick} 
        className='group hover:text-red-600 cursor-pointer transition-all ease-in-out duration-200'>
        <IoClose className='text-3xl group-hover:scale-90 ease-initial duration-200 transition-all' />
    </button>
  )
}