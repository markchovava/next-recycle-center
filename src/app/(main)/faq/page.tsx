import HeaderTertiary from "@/_components/headers/HeaderTertiary";
import FaqPage from "./_components/FaqPage";
import { Metadata } from "next";
import { AppInfoData } from "@/_data/sample/AppInfoData";


export const metadata: Metadata = {
  title: `${AppInfoData.name} - FAQs`,
  description: "The RecycleMate app.",
};


export default function page() {
  return (
    <>
    <HeaderTertiary title='FAQs' />
    <FaqPage />
    </>
  )
}
