"use client"
import CardNews from "@/_components/cards/CardNews";
import FormSearch from "@/_components/forms/FormSearch";
import Heading2 from "@/_components/headings/Heading2";
import SpacerPrimary from "@/_components/spacers/SpacerPrimary";
import SpacerQuaternary from "@/_components/spacers/SpacerQuaternary";
import SpacerSecondary from "@/_components/spacers/SpacerSecondary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import { NewsCategoriesData } from "@/_data/sample/CategoryData";
import { NewsData } from "@/_data/sample/NewsData";
import { useNewsStore } from "@/_store/useNewsStore";
import { useEffect, useState } from "react";




export default function NewsPage({dbData}: { dbData: any }) {
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
        getSearchPriorityStatusDataList
    } = useNewsStore()
    useEffect(() => {
        setDataList(dbData)
    }, [])
 
    async function handlePaginate(url: string) {
        await getPaginatedDataList(url)
    }  
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await getSearchPriorityStatusDataList(search)
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
                <Heading2 title="Search Recycle News" />
            </div>
            <SpacerQuaternary />
           <FormSearch 
                name="search"
                css="rounded-full w-full px-4 py-3"
                onChange={setSearch}
                handleSearch={handleSearch}
                value={search} 
                isSearch={isSearching} 
                placeholder="Enter Search here.."  />
        </div>

        <SpacerQuaternary /> 
        <div className="lg:w-[85%] w-[92%] mx-auto">
            <SpacerSecondary />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {dataList.map((i, key) => (
                    <div key={key} className="bg-white drop-shadow rounded-lg overflow-hidden">
                        <CardNews dbData={i} />
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
