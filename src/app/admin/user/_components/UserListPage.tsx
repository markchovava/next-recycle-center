"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { toast } from "react-toastify";
import UserAddModal from "./UserAddModal";


const domData = {
  isSearch: false,
  search: "",
}

export default function UserListPage() {
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
      <TitlePrimary title='Users List' />
      <SpacerTertiary />

      <section className="w-full lg:overflow-hidden overflow-scroll">
        <div className='lg:w-[100%] w-[70rem]'>

          <section className="flex lg:flex-row flex-col items-center justify-between gap-4 mb-4">
            <form onSubmit={handleSearch} className="lg:w-[60%] w-full flex items-center justify-start rounded-xl border border-gray-300">
              <input 
                type="text" 
                placeholder="Enter Name" 
                value={data.search}
                onChange={(e) => setData({...data, search: e.target.value})}
                className="flex-1 py-3 px-4 outline-none rounded-l-full" 
              />
              <button type="submit" className="group px-6 py-3 border-l border-gray-300 rounded-r-full">
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
              css="px-8 py-3"  
            />
          </section>

          {/* Header */}
          <section className="w-full bg-gray-300 font-bold text-lg border border-gray-400 flex items-center justify-start">
            <div className="flex-5 border-r border-gray-400 px-2 py-1">NAME</div>
            <div className="flex-4 border-r border-gray-400 px-2 py-1">EMAIL</div>
            <div className="flex-3 border-r border-gray-400 px-2 py-1">ROLE</div>
            <div className="flex-2 px-2 border-gray-400 py-1 text-end">ACTION</div>
          </section>
          
          {[...Array(5)].map((i, key) => (
            <section key={key} className="w-full border-x border-b border-gray-400 flex items-center justify-start">
              <div className="flex-5 border-r border-gray-400 px-2 py-1">NAME</div>
              <div className="flex-4 border-r border-gray-400 px-2 py-1">EMAIL</div>
              <div className="flex-3 border-r border-gray-400 px-2 py-1">ROLE</div>
              <div className="flex-2 px-2 border-gray-400 py-1 text-end">ACTION</div>
            </section>
          ))}

        </div>
      </section>
   
    </section>

    <UserAddModal isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}
