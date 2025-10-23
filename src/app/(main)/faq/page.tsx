import HeaderTertiary from "@/_components/headers/HeaderTertiary";
import FaqPage from "./_components/FaqPage";
import { Metadata } from "next";
import { AppInfoData } from "@/_data/sample/AppInfoData";
import { faqListAction } from "@/_actions/FaqActions";


export const metadata: Metadata = {
  title: `${AppInfoData.name} - FAQs`,
  description: "The RecycleMate app.",
};


export default async function page() {
  const [ faqData ] = await Promise.all([ faqListAction() ]);
  return (
    <>
    <HeaderTertiary title='FAQs' />
    <FaqPage dbData={faqData} />
    </>
  )
}
