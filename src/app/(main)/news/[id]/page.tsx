import { PageByIdInterface } from "@/_data/interface/PageByIdInterface";
import NewsViewPage from "./_components/NewsViewPage";
import HeaderTertiary from "@/_components/headers/HeaderTertiary";
import SpacerPrimary from "@/_components/spacers/SpacerPrimary";
import { Metadata } from "next";
import { AppInfoData } from "@/_data/sample/AppInfoData";


export const metadata: Metadata = {
  title: `${AppInfoData.name} - View News`,
  description: "The RecycleMate app",
};


export default function page({params: {id}}: PageByIdInterface) {
  return (
    <>
    <HeaderTertiary title='News' />
    
    <SpacerPrimary />
    <NewsViewPage id={id} />
    
    <SpacerPrimary />
    </>
  )
}
