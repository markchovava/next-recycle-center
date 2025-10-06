"use client"
import CardNews from "@/_components/cards/CardNews";
import FormSearch from "@/_components/forms/FormSearch";
import Heading2 from "@/_components/headings/Heading2";
import PaginationPrimary from "@/_components/pagination/PaginationPrimary";
import SpacerPrimary from "@/_components/spacers/SpacerPrimary";
import SpacerQuaternary from "@/_components/spacers/SpacerQuaternary";
import SpacerSecondary from "@/_components/spacers/SpacerSecondary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import { NewsCategoriesData } from "@/_data/sample/CategoryData";
import { NewsData } from "@/_data/sample/NewsData";
import { useState } from "react";


const InputData = {
    search: "",
    isSearch: false,
}

export default function NewsPage() {
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


    console.log("NewsData:::", NewsData)


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
                onChange={handleInput}
                handleSearch={handleSearch}
                value={data.search} 
                isSearch={data.isSearch} 
                placeholder="Enter title here.."  />
        </div>

        <SpacerQuaternary /> 
        <SpacerQuaternary /> 
        <div className="w-[85%] mx-auto grid lg:grid-cols-5 grid-cols-3 gap-4">
            {NewsCategoriesData.map((i, key) => (
                <div key={key} className={` flex items-center justify-center cursor-pointer border border-gray-600 text-gray-800 
                    ease-initial duration-200 transition-all hover:bg-gray-600 hover:text-white rounded-full px-3 py-1 
                    text-center text-sm`}>
                    {i.name}
                </div>
            ))}
        </div>

        <div className="lg:w-[85%] w-[92%] mx-auto">
            <SpacerSecondary />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {NewsData.map((i, key) => (
                    <div key={key} className="bg-white drop-shadow rounded-lg overflow-hidden">
                        <CardNews dbData={i} />
                    </div>
                ))}
            </div>
            <SpacerTertiary />
            <PaginationPrimary />
            
        </div>
    </section>
    
    <SpacerPrimary />
    </>
  )
}
