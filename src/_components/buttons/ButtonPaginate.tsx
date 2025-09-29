"use client"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"



export default function ButtonPaginate({direction}: {direction: "left" | "right"}) {

    
    return (
        <button className="cursor-pointer flex items-center justify-center gap-1 px-4 py-1 rounded-xl bg-white border border-gray-300 text-gray-500 hover:drop-shadow hover:text-gray-900 transition-all duration-200">
            {direction === "right" ?
                <>
                Next <FaAngleRight className="" />
                </>
                : direction === "left" ?
                <>
                <FaAngleLeft className="" /> Previous
                </>
                : null
            }
        </button>
    );
}