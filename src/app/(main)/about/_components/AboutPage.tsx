"use client"

import FadeSlideIn from "@/_components/_effects/FadeSlideIn"
import FormContact from "@/_components/forms/FormContact"
import AboutSection from "@/_components/sections/AboutSection"
import SolutionsSection from "@/_components/sections/SolutionsSection"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"



export default function AboutPage() {
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
            <FormContact />
        </FadeSlideIn>
    </>
  )
}
