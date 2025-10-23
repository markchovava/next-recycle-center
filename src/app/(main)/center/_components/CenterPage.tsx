"use client"
import CardCenter from "@/_components/cards/CardCenter";
import FormSearch from "@/_components/forms/FormSearch";
import Heading2 from "@/_components/headings/Heading2";
import SpacerPrimary from "@/_components/spacers/SpacerPrimary";
import SpacerQuaternary from "@/_components/spacers/SpacerQuaternary";
import SpacerSecondary from "@/_components/spacers/SpacerSecondary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import { CenterData } from "@/_data/sample/CenterData";
import { useCenterStore } from "@/_store/useCenterStore";
import { useEffect, useState } from "react";


const InputData = {
    search: "",
    isSearch: false,
}

export default function CenterPage({centerData}: {centerData: any}) {
    const {
        data,
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
    } = useCenterStore()

    useEffect(() => {
        setDataList(centerData)
    }, [])

  

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          await getSearchDataList(search)
        } catch (error) {
            console.error('Form submission error:', error);
        }
    }


  return (
    <>
    <SpacerPrimary />
    <section>

        <div className="mx-auto lg:w-[70%] w-[92%]">
            <div className="flex items-center justify-center">
                <Heading2 title="Search Recycle Centers" />
            </div>
            <SpacerQuaternary />
            <FormSearch 
                name="search"
                css="rounded-full w-full px-4 py-3"
                onChange={setSearch}
                handleSearch={handleSearch}
                value={search} 
                isSearch={isSearching} 
                placeholder="Enter Center Name here.."  />
        </div>

        <div className="lg:w-[85%] w-[92%] mx-auto">
            <SpacerSecondary />
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
                {dataList.map((i, key) => (
                    <div key={key} className="bg-white drop-shadow rounded-lg overflow-hidden">
                        <CardCenter dbData={i} />
                    </div>
                ))}
            </div>
            <SpacerTertiary />
            
            
        </div>
    </section>
    
    <SpacerPrimary />
    </>
  )
}
