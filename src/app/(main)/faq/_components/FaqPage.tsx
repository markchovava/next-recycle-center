"use client"
import FadeSlideIn from "@/_components/_effects/FadeSlideIn";

import FormSearch from "@/_components/forms/FormSearch";
import Heading2 from "@/_components/headings/Heading2";
import LoaderPrimary from "@/_components/loaders/LoaderPrimary";
import PaginationPrimary from "@/_components/pagination/PaginationPrimary";
import SpacerPrimary from "@/_components/spacers/SpacerPrimary";
import SpacerQuaternary from "@/_components/spacers/SpacerQuaternary";
import SpacerSecondary from "@/_components/spacers/SpacerSecondary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TabPrimary from "@/_components/tabs/TabPrimary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import TitleTertiary from "@/_components/titles/TitleTertiary";
import { CenterData } from "@/_data/sample/CenterData";
import { FaqData } from "@/_data/sample/FaqData";
import { useFaqStore } from "@/_store/useFaqStore";
import { useEffect, useState } from "react";


const title ="Search FAQs"



export default function FaqPage({ dbData }: {dbData: any}) {

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
    } = useFaqStore()
    
    useEffect(() => {
        setDataList(dbData)
    }, [])
    
     
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
    <SpacerPrimary />
    
         <div className="mx-auto lg:w-[70%] w-[92%]">
            <div className="flex items-center justify-center">
                <Heading2 title={title} />
            </div>
            <SpacerQuaternary />
            <FormSearch 
                name="search"
                css="rounded-full w-full px-4 py-3"
                onChange={setSearch}
                handleSearch={handleSearch}
                value={search} 
                isSearch={isSearching} 
                placeholder="Enter Question here.."  />
        </div>

        <SpacerSecondary />
        <FadeSlideIn slideDirection="up" duration={1500}>
            <section className="w-full">
                <div className="lg:w-[85%] w-[92%] mx-auto">
                    <TitleTertiary 
                        title="FAQs" 
                        btnTitle="View More" 
                        btnHref="" 
                    />
                    <SpacerTertiary />
                    {dataList.map((i, key) => (
                        <TabPrimary key={key} dbData={i} />
                    ))}

                    <SpacerTertiary />
                    
                </div>
            </section>
        </FadeSlideIn>

           
        <SpacerPrimary />

    </>
  )
}
