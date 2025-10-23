import HeaderTertiary from "@/_components/headers/HeaderTertiary";
import CenterViewPage from "./_components/CenterViewPage";
import { PageByIdInterface } from "@/_data/interface/PageByIdInterface";
import SpacerPrimary from "@/_components/spacers/SpacerPrimary";
import { Metadata } from "next";
import { AppInfoData } from "@/_data/sample/AppInfoData";
import { centerViewAction } from "@/_actions/CenterActions";


export const metadata: Metadata = {
  title: `${AppInfoData.name} - View Center`,
  description: "The RecycleMate app",
};


export default async function page({params: {id}}: PageByIdInterface) {
  const [ centerData ] = await Promise.all([centerViewAction(id)]);
  return (
    <>
    <HeaderTertiary title='View Center' />

    <SpacerPrimary />
    <CenterViewPage id={id} dbData={centerData.data} />
    
    <SpacerPrimary />
    </>
  )
}
