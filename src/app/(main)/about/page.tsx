import HeaderTertiary from "@/_components/headers/HeaderTertiary";
import { AppInfoData } from "@/_data/sample/AppInfoData";
import { Metadata } from "next";
import AboutPage from "./_components/AboutPage";


export const metadata: Metadata = {
  title: `${AppInfoData.name} - About Us`,
  description: "The RecycleMate app.",
};



export default function page() {
  return (
    <>
    <HeaderTertiary title='About Us' />
    <AboutPage />
    </>
  )
}
