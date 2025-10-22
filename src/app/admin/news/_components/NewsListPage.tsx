"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import NewsAddModal from "./NewsAddModal";
import Link from "next/link";
import { useNewsStore } from "@/_store/useNewsStore";
import LoaderPrimary from "@/_components/loaders/LoaderPrimary";
import PaginationPrimary from "@/_components/pagination/PaginationPrimary";
import { _newsDeleteAction } from "@/_actions/NewsActions";
import { toast } from "react-toastify";
import NoDataPrimary from "@/_components/NoDataPrimary";
import { trimString } from "@/_utils/StringManipulation";
import { formatDate } from "@/_utils/formatDate";
import NewsSticker from "@/_components/stickers/NewsSticker";
import { useAccessStore } from "@/_store/useAccessStore";



const title = "News List"

export default function NewsListPage({dbData}: any) {
    const [isModal, setIsModal] = useState<boolean>(false);
    const {
        setDataList, 
        dataList, 
        isSearching, 
        isLoading,
        meta, 
        links, 
        getDataList,
        getPaginatedDataList,
        getSearchDataList,
        search,
        setSearch,
    } = useNewsStore()
    const { currentUser, getUserCookie} = useAccessStore()

  
      useEffect(() => {
        getUserCookie();
        setDataList(dbData)
      }, [])

      async function handleDelete(id: string | number){
          try{
              const res = await _newsDeleteAction(id) 
              const {data, status, message} = res
              if(status === 1) {
                toast.warn(message)
                await getDataList()
              }
          }catch(error){
            console.error('Delete error: ', error);
          }
      }
      
      
      async function handlePaginate(url: string) {
        await getPaginatedDataList(url)
      }
      
      const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          try {
            await getSearchDataList(search)
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
          <section className="flex lg:flex-row flex-col items-news justify-between gap-4 mb-4">
            <form onSubmit={handleSearch} className="lg:w-[60%] w-full flex items-news justify-start rounded-lg border border-gray-300">
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
            {Number(currentUser.isAdmin) === 1 &&
              <ButtonPrimary
                onClick={() => setIsModal(!isModal)}
                title='Add'
                css="px-8 py-2"  
              />
            }
          </section>

          { dataList && dataList.length > 0  ?  
            <section className="w-full lg:overflow-hidden overflow-scroll">
              <div className='lg:w-[100%] w-[70rem]'>

                {/* HEADER */}
                <section className="w-full bg-gray-300 font-bold text-lg border border-gray-400 flex items-news justify-start">
                  <div className="flex-5 border-r border-gray-400 px-2 py-1">TITLE</div>
                  <div className="flex-4 border-r border-gray-400 px-2 py-1">STATUS</div>
                  <div className="flex-3 border-r border-gray-400 px-2 py-1">CREATED</div>
                  <div className="flex-2 px-2 border-gray-400 py-1 text-end">ACTION</div>
                </section>
                {/* ITEMS */}
                {dataList.map((i, key) => (
                  <section key={key} className="w-full border-x border-b border-gray-400 flex items-news justify-start">
                    <div className="flex-5 border-r border-gray-400 px-2 py-1">{trimString(i.title, 20)}</div>
                    <div className="flex-4 border-r border-gray-400 px-2 py-1">
                      <NewsSticker status={i.status} />
                    </div>
                    <div className="flex-3 border-r border-gray-400 px-2 py-1">
                      {formatDate(i.createdAt)}
                    </div>
                    <div className="flex-2 px-2 border-gray-400 py-1 text-end flex items-news justify-end gap-3">
                      <button className="cursor-pointer group">
                      <Link href={`/admin/news/${i.id}`}>
                        <FaEye className="text-xl text-gray-800 group-hover:text-green-600 group-hover:scale-110 ease-initial transition-all duration-200" />
                      </Link>
                      </button>
                      {Number(currentUser.isAdmin) === 1 &&
                        <button 
                          onClick={() => handleDelete(i.id)} 
                          className="cursor-pointer group">
                          <FaDeleteLeft className="text-xl text-gray-800 group-hover:text-red-600 group-hover:scale-110 ease-initial transition-all duration-200" />
                        </button>
                      }
                    </div>
                  </section>
                ))}

              </div>
            </section>
            : 
                <NoDataPrimary />
            }
      
      <SpacerTertiary />
      <PaginationPrimary meta={meta} links={links} handlePaginate={handlePaginate} />
   
    </section>

    <NewsAddModal isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}
