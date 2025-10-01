"use client"
import { FaTruckPickup, FaRecycle, FaRegNewspaper } from "react-icons/fa6";
import { BsInfoCircle } from "react-icons/bs";

interface CardSecondaryInterface {
    iconType: string,
    title: string,
    details: string,
    css?: string
}

export default function CardSecondary({ dbData }: { dbData: CardSecondaryInterface }) {
    const { iconType, title, details, css=" from-blue-600 to-blue-950" } = dbData

    const icon = () => {
        switch (iconType) {
            case "pickup":
                return <FaTruckPickup className="text-[8rem] text-white" />
            case "center":
                return <FaRecycle className="text-[8rem] text-white" />
            case "educate":
                return <BsInfoCircle className="text-[8rem] text-white" />
            case "updates":
                return <FaRegNewspaper className="text-[8rem] text-white" />
            default:
                return null
        }
    }

    return (
        <div className="grid grid-cols-2">
            <div className={`${css} bg-gradient-to-br aspect-[5/4] w-full flex items-center justify-center`}>
                {icon()}
            </div>
            <div className="flex flex-col items-start justify-center gap-2 p-3 bg-white drop-shadow">
                <h2 className="font-bold text-xl">{title}</h2>
                <p className="font-light text-lg">{details}</p>
            </div>
        </div>
    )
}