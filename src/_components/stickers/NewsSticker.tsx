"use client"

export default function NewsSticker({status}: {status: string}) {
    const css = (() => {
        switch (status) {
            case "Published":
                return "bg-green-700";
            case "Requested":
                return "bg-blue-700";
            case "Draft":
                return "bg-blue-700";
            case "Review":
                return "bg-yellow-700";
            case "Archived":
                return "bg-gray-700";
            default:
                // Fallback style for unknown statuses
                return "bg-stone-700";
        }
    })(); 

  return (
    <span className={`${css} rounded-full text-sm text-white py-0.5 px-1.5`}>
        {status}
    </span>
  )
}
