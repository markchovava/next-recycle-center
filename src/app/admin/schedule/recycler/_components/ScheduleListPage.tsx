"use client"
import ButtonPaginate from "@/_components/buttons/ButtonPaginate";
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import Link from "next/link";
import { useState } from "react";
import { FaDeleteLeft, FaEye } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { ScheduleData } from "@/_data/sample/ScheduleData";
import ScheduleAddModal from "./ScheduleAddModal";



const domData = {
  isSearch: false,
  search: "",
}


export default function ScheduleListPage() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [data, setData] = useState(domData)


  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setData({...data, isSearch: true})
      try {
          // Add your form submission logic here
          console.log('Form data:', data);
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));    
      } catch (error) {
          console.error('Form submission error:', error);
      } finally {
          setData({...data, isSearch: false})
      }  
  }



  return (
    <>
     <section className='mx-auto w-[92%]'>
        <TitlePrimary title='Schedules List' />
        <SpacerTertiary />

        <section className="w-full lg:overflow-hidden overflow-scroll">
            <div className='lg:w-[100%] w-[70rem]'>
                {/* Search Bar */}
                <section className="flex lg:flex-row flex-col items-center justify-between gap-4 mb-4">
                <form onSubmit={handleSearch} className="lg:w-[60%] w-full flex items-center justify-start rounded-lg border border-gray-300">
                    <input 
                    type="text" 
                    placeholder="Enter Name" 
                    value={data.search}
                    onChange={(e) => setData({...data, search: e.target.value})}
                    className="flex-1 py-2 px-4 outline-none rounded-l-full" 
                    />
                    <button type="submit" className="group px-6 py-2 border-l border-gray-300 rounded-r-full">
                    {data.isSearch ? 
                    <GoDotFill className="cursor-pointer text-2xl animate-pulse text-gray-900" />
                    :
                        <IoSearch className="cursor-pointer text-xl text-gray-500 transition-all ease-initial duration-200 group-hover:text-gray-900 group-hover:scale-110" />
                    }
                    </button>
                </form>
                <ButtonPrimary
                    onClick={() => setIsModal(!isModal)}
                    title='Add'
                    css="px-8 py-2"  
                />
                </section>

                {/* HEADER */}
                <section className="w-full bg-gray-300 font-bold text-lg border border-gray-400 flex items-center justify-start">
                <div className="flex-5 border-r border-gray-400 px-2 py-1">DATE & TIME</div>
                <div className="flex-4 border-r border-gray-400 px-2 py-1">CENTER</div>
                <div className="flex-4 border-r border-gray-400 px-2 py-1">USER</div>
                <div className="flex-2 px-2 border-gray-400 py-1 text-end">ACTION</div>
                </section>
                
                {/* ITEMS */}
                {ScheduleData.map((i, key) => (
                <section key={key} className="w-full border-x border-b border-gray-400 flex items-center justify-start">
                    <div className="flex-5 border-r border-gray-400 px-2 py-1">
                      <div>Date: {i.createdAt}</div>
                      <div>Time: {i.time}</div>
                    </div>
                    <div className="flex-4 border-r border-gray-400 px-2 py-1">
                    {i.center}
                    </div>
                    <div className="flex-4 border-r border-gray-400 px-2 py-1">{i.userId}</div>
                    <div className="flex-2 px-2 border-gray-400 py-1 text-end flex items-center justify-end gap-3">
                    <button className="cursor-pointer group">
                    <Link href={`/admin/schedule/${i.id}`}>
                        <FaEye className="text-xl text-gray-800 group-hover:text-green-600 group-hover:scale-110 ease-initial transition-all duration-200" />
                    </Link>
                    </button>
                    <button className="cursor-pointer group">
                        <FaDeleteLeft className="text-xl text-gray-800 group-hover:text-red-600 group-hover:scale-110 ease-initial transition-all duration-200" />
                    </button>
                    </div>
                </section>
                ))}

            </div>
        </section>


        <SpacerTertiary />
        <section className="w-full flex items-center justify-end gap-3 mt-4">
          <p className="font-light italic">Showing 1 to 5 of 5 entries</p>
          <ButtonPaginate direction="left"  />
          <ButtonPaginate direction="right"  />
        </section>
      </section>

      <ScheduleAddModal isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}

