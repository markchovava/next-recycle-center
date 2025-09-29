"use client"

interface ButtonSubmitProps {
    isSubmit: boolean,
    title: string
}



export default function ButtonSubmit({ 
    isSubmit, 
    title="Submit" 
}: ButtonSubmitProps
) {
  return (
    <button 
        type="submit" 
        className={`px-12 py-3 my-2 rounded-lg cursor-pointer ease-initial duration-200 
        text-white bg-green-700 hover:bg-green-800 hover:drop-shadow 
        ${isSubmit ? "bg-green-800 cursor-not-allowed" : ""}`}>
            { isSubmit ? 
            "Submitting..." : 
            title }
    </button>
  )
}
