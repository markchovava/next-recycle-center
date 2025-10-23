import { Metadata } from "next";
import { PageByIdInterface } from "@/_data/interface/PageByIdInterface";
import NewsViewPage from "./_components/NewsViewPage";
import HeaderTertiary from "@/_components/headers/HeaderTertiary";
import SpacerPrimary from "@/_components/spacers/SpacerPrimary";
import { AppInfoData } from "@/_data/sample/AppInfoData";
import { newsViewAction } from "@/_actions/NewsActions";



export const metadata: Metadata = {
  title: `${AppInfoData.name} - View News`,
  description: "The RecycleMate app",
};


export default async function page({params: {id} }: PageByIdInterface) {
  const [ newsData ] = await Promise.all([ newsViewAction(id) ])


  return (
    <>
    <HeaderTertiary title='News' />
    
    <SpacerPrimary />
    <NewsViewPage id={id} dbData={newsData.data} />
    
    <SpacerPrimary />
    </>
  )
}
