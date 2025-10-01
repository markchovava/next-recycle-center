"use client"
import { JSX, useState } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"


interface TabPrimaryInterface{
    question: string,
    answer: string | JSX.Element,
}

export default function TabPrimary({dbData}: {dbData: TabPrimaryInterface}) {
    const {question, answer} = dbData

    const [isOpen, setIsOpen] = useState(false)

    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }

  return (
    <section className="mb-4">
        <div className="px-8 py-4 bg-gray-100 drop-shadow flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-200 transition-colors duration-200" onClick={handleIsOpen}>
            <p className="text-xl">
                {question}
            </p>
            <button className="cursor-pointer p-2 rounded-full hover:bg-gray-300 flex-shrink-0 transition-transform duration-300" aria-label={isOpen ? "Collapse" : "Expand"}>
                {isOpen ? (
                    <FaAngleUp className="text-2xl" />
                ) : (
                    <FaAngleDown className="text-2xl" />
                )}
            </button>
        </div>  
        <div 
            className={`bg-white drop-shadow overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`} >
            <div className="px-8 py-4 font-light text-xl">
                {answer}
            </div>
        </div>
    </section>
  )
}