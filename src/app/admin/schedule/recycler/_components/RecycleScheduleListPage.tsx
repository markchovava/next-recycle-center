"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaDeleteLeft, FaEye } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { ScheduleData } from "@/_data/sample/ScheduleData";
import ScheduleAddModal from "./ScheduleAddModal";
import LoaderPrimary from "@/_components/loaders/LoaderPrimary";
import { useScheduleStore } from "@/_store/useScheduleStore";
import { _scheduleDeleteAction } from "@/_actions/ScheduleActions";
import PaginationPrimary from "@/_components/pagination/PaginationPrimary";
import { toast } from "react-toastify";
import { formatDate } from "@/_utils/formatDate";
import StickerPrimary from "@/_components/stickers/StickerPrimary";





/* --------------------------------------- */
const title = "Recyclers Schedule List"
/* --------------------------------------- */


export default function RecyclerScheduleListPage(
  { dbData, }: { dbData: any, }
) {
    const [isModal, setIsModal] = useState<boolean>(false);
    const {
        setDataList, 
        dataList, 
        isSearching, 
        isLoading,
        meta, 
        links, 
        getScheduleOfCustomerDataList,
        getPaginatedDataList,
        search,
        setSearch,
        getSearchScheduleRecyclerDataList,
    } = useScheduleStore()

    console.log("dbData", dbData)
  
    useEffect(() => {
        setDataList(dbData)
    }, []);
  
    async function handlePaginate(url: string) {
        await getPaginatedDataList(url)
    }
  
    async function handleDelete(id: string | number){
      try{
          const res = await _scheduleDeleteAction(id) 
          const {data, status, message} = res
          if(status === 1) {
            toast.warn(message)
            await getScheduleOfCustomerDataList()
          }
      }catch(error){
        console.error('Delete error: ', error);
      }
    }
  
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          await getSearchScheduleRecyclerDataList(search)
        } catch (error) {
            console.error('Form submission error:', error);
        }
    }
  
    if (isLoading) {
      return (
        <section className="w-[92%] mx-auto">
          <TitlePrimary title={title} />
          <SpacerTertiary />
          <LoaderPrimary />
        </section>
      );
    }



  return (
    <>
     <section className='mx-auto w-[92%]'>
        <TitlePrimary title={title} />
        <SpacerTertiary />

       
                {/* Search Bar */}
                <section className="flex lg:flex-row flex-col items-center justify-between gap-4 mb-4">
                <form onSubmit={handleSearch} className="lg:w-[60%] w-full flex items-center justify-start rounded-lg border border-gray-300">
                    <input 
                    type="text" 
                    placeholder="Enter Name" 
                    value={search}
                    onChange={setSearch}
                    className="flex-1 py-2 px-4 outline-none rounded-l-full" 
                    />
                    <button type="submit" className="group px-6 py-2 border-l border-gray-300 rounded-r-full">
                    {isSearching ? 
                    <GoDotFill className="cursor-pointer text-2xl animate-pulse text-gray-900" />
                    :
                        <IoSearch className="cursor-pointer text-xl text-gray-500 transition-all ease-initial duration-200 group-hover:text-gray-900 group-hover:scale-110" />
                    }
                    </button>
                </form>
                {/* <ButtonPrimary
                    onClick={() => setIsModal(!isModal)}
                    title='Add'
                    css="px-8 py-2"  
                /> */}
                </section>

            <section className="w-full lg:overflow-hidden overflow-scroll">
              <div className='lg:w-[100%] w-[70rem]'>
                {/* HEADER */}
                <section className="w-full bg-gray-300 font-bold text-lg border border-gray-400 flex items-center justify-start">
                  <div className="flex-5 border-r border-gray-400 px-2 py-1">RECYCLER CENTER</div>
                  <div className="flex-4 border-r border-gray-400 px-2 py-1">STATUS</div>
                  <div className="flex-4 border-r border-gray-400 px-2 py-1">DATE & TIME</div>
                  <div className="flex-2 px-2 border-gray-400 py-1 text-end">ACTION</div>
                </section>
                
                {/* ITEMS */}
                {dataList.map((i, key) => (
                <section key={key} className="w-full border-x border-b border-gray-400 flex items-center justify-start">
                    <div className="flex-5 border-r border-gray-400 px-2 py-1">
                      {i.centerName}
                    </div>
                    <div className="flex-4 border-r border-gray-400 px-2 py-1">
                    {i.customerStatus ?
                    <StickerPrimary status={i.customerStatus} />
                      : "Not Added." }
                    </div>
                    <div className="flex-4 border-r border-gray-400 px-2 py-1">
                      <div>Date: {i.requestDate ? formatDate(i.requestDate) : "Not Added."}</div>
                      <div>Time: {i.requestTime ?? "Not Added."}</div>
                    </div>
                    <div className="flex-2 px-2 border-gray-400 py-1 text-end flex items-center justify-end gap-3">
                    <button className="cursor-pointer group">
                    <Link href={`/admin/schedule/recycler/${i.id}`}>
                        <FaEye className="text-xl text-gray-800 group-hover:text-green-600 group-hover:scale-110 ease-initial transition-all duration-200" />
                    </Link>
                    </button>
                    <button onClick={() => handleDelete(i.id)} className="cursor-pointer group">
                        <FaDeleteLeft className="text-xl text-gray-800 group-hover:text-red-600 group-hover:scale-110 ease-initial transition-all duration-200" />
                    </button>
                    </div>
                </section>
                ))}

            </div>
        </section>


        <SpacerTertiary />
        <PaginationPrimary 
            meta={meta} 
            links={links} 
            handlePaginate={handlePaginate} />
      </section>

      {/* <ScheduleAddModal isModal={isModal} setIsModal={setIsModal} /> */}
    </>
  )
}

