"use client"
import CardCenter from "@/_components/cards/CardCenter";
import FormSearch from "@/_components/forms/FormSearch";
import Heading2 from "@/_components/headings/Heading2";
import PaginationPrimary from "@/_components/pagination/PaginationPrimary";
import SpacerPrimary from "@/_components/spacers/SpacerPrimary";
import SpacerQuaternary from "@/_components/spacers/SpacerQuaternary";
import SpacerSecondary from "@/_components/spacers/SpacerSecondary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import { CenterData } from "@/_data/sample/CenterData";
import { useState } from "react";


const InputData = {
    search: "",
    isSearch: false,
}

export default function CenterPage() {
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
    <section>

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
                placeholder="Enter Center Name here.."  />
        </div>

        <div className="lg:w-[85%] w-[92%] mx-auto">


            <SpacerSecondary />
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
                {CenterData.map((i, key) => (
                    <div key={key} className="bg-white drop-shadow rounded-lg overflow-hidden">
                        <CardCenter dbData={i} />
                    </div>
                ))}
            </div>

            <SpacerSecondary />
            <PaginationPrimary />
            
            <SpacerPrimary />
        </div>
    </section>
    </>
  )
}
