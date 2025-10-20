"use client"


interface StickerInterface {
    status: string
}

export default function StickerPrimary({status}: StickerInterface) {
    const css = (() => {
        switch (status) {
            case "Collected":
                return "bg-blue-700";
            case "Requested":
                return "bg-violet-700";
            case "Received":
                return "bg-green-700";
            default:
                return "bg-stone-700";
        }
    })(); 

  return (
    <span className={`${css} rounded-full text-white py-1 px-2`}>
        {status}
    </span>
  )
}
