import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import AppInfoViewPage from "./_components/AppInfoViewPage"
import { appInfoViewAction } from "@/_actions/AppInfoActions"



const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Settings", href:"/admin/settings"},
    {id: 4, name: "App Information", href:"/admin/app-info"},
]


export default async function page() {
  const [ appInfoData ] = await Promise.all([appInfoViewAction()]);

  return (
    <>
    <>
        <HeaderPrimary />
        <BreadCrumbs dbData={BreadCrumbsData} />
        
        <SpacerSecondary />
        <AppInfoViewPage dbData={appInfoData.data} />

        <SpacerPrimary />       
    </>
    </>
  )
}
