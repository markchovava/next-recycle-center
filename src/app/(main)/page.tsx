import HeaderSecondary from "@/_components/headers/HeaderSecondary";
import HomePage from "./_components/HomePage";
import { Metadata } from "next";
import { AppInfoData } from "@/_data/sample/AppInfoData";
import { centerListAction } from "@/_actions/CenterActions";
import { faqListAction } from "@/_actions/FaqActions";


export const metadata: Metadata = {
  title: `${AppInfoData.name} - Home`,
  description: "The RecycleMate app",
};


export default async function Home() {
  const [ centerData, faqData ] = await Promise.all([centerListAction(), faqListAction()]);

  return (
   <>
   <HeaderSecondary />
   
   <HomePage centerData={centerData} faqData={faqData.data} />

  
   </>
  );
}
