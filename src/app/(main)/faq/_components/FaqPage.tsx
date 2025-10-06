"use client"
import FadeSlideIn from "@/_components/_effects/FadeSlideIn";

import FormSearch from "@/_components/forms/FormSearch";
import Heading2 from "@/_components/headings/Heading2";
import PaginationPrimary from "@/_components/pagination/PaginationPrimary";
import SpacerPrimary from "@/_components/spacers/SpacerPrimary";
import SpacerQuaternary from "@/_components/spacers/SpacerQuaternary";
import SpacerSecondary from "@/_components/spacers/SpacerSecondary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TabPrimary from "@/_components/tabs/TabPrimary";
import TitleTertiary from "@/_components/titles/TitleTertiary";
import { CenterData } from "@/_data/sample/CenterData";
import { FaqData } from "@/_data/sample/FaqData";
import { useState } from "react";


const InputData = {
    search: "",
    isSearch: false,
}

export default function FaqPage() {
    const [data, setData] = useState(InputData)
    
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value})
    }

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
    <SpacerPrimary />
    
         <div className="mx-auto lg:w-[70%] w-[92%]">
            <div className="flex items-center justify-center">
                <Heading2 title="Search Recycle Centers" />
            </div>
            <SpacerQuaternary />
            <FormSearch 
                name="search"
                css="rounded-full w-full px-4 py-3"
                onChange={handleInput}
                handleSearch={handleSearch}
                value={data.search} 
                isSearch={data.isSearch} 
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
                    {FaqData.map((i, key) => (
                        key < 8 &&
                        <TabPrimary key={key} dbData={i} />
                    ))}

                    <SpacerTertiary />
                    <PaginationPrimary />
                </div>
            </section>
        </FadeSlideIn>

           
        <SpacerPrimary />

    </>
  )
}
