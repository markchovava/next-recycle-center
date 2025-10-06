"use client"

import FadeSlideIn from "@/_components/_effects/FadeSlideIn"
import CardSecondary from "@/_components/cards/CardSecondary"
import CarouselPrimary from "@/_components/carousels/CarouselPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import SpacerTertiary from "@/_components/spacers/SpacerTertiary"
import TitlePrimary from "@/_components/titles/TitlePrimary"
import { AboutData } from "@/_data/sample/AboutData"
import TabPrimary from "@/_components/tabs/TabPrimary"
import { FaqData } from "@/_data/sample/FaqData"
import TitleTertiary from "@/_components/titles/TitleTertiary"
import FormContact from "@/_components/forms/FormContact"
import AboutSection from "@/_components/sections/AboutSection"
import SolutionsSection from "@/_components/sections/SolutionsSection"


export default function HomePage() {
  return (
    <>
    <SpacerPrimary />
    <FadeSlideIn slideDirection="up" duration={1500}>
        <AboutSection />
    </FadeSlideIn>


    <SpacerPrimary />
    <FadeSlideIn slideDirection="up" duration={1500}>  
       <SolutionsSection />
    </FadeSlideIn>


    <SpacerPrimary />
    <FadeSlideIn slideDirection="up" duration={1500}>  
        <section className="w-full bg-green-800 text-white">
            <div className="mx-auto w-[92%]">
                <SpacerSecondary />
                <TitleTertiary 
                    title="Recycle Centers" 
                    btnTitle="View More" 
                    btnHref="/center" 
                />
                <SpacerTertiary />
                <CarouselPrimary />
            </div>
            <SpacerSecondary />
        </section>
    </FadeSlideIn>


     <SpacerPrimary />
    <FadeSlideIn slideDirection="up" duration={1500}>
        <section className="w-full">
            <div className="mx-auto lg:w-[92%] w-[80%]">
                <TitleTertiary 
                    title="FAQs" 
                    btnTitle="View More" 
                    btnHref="/faq" 
                />
                <SpacerTertiary />
               {FaqData.map((i, key) => (
                    key < 8 &&
                   <TabPrimary key={key} dbData={i} />
               ))}
               
            </div>
        </section>
    </FadeSlideIn>


    <SpacerPrimary />
    <FadeSlideIn slideDirection="up" duration={1500}>
        <FormContact />
    </FadeSlideIn>

   

    </>
  )
}
