import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import AppInfoViewPage from "./_components/AppInfoViewPage"




const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Settings", href:"/admin/settings"},
    {id: 4, name: "App Informatione", href:"/admin/app-info"},
]
export default function page() {
  return (
    <>
    <>
        <HeaderPrimary />
        <BreadCrumbs dbData={BreadCrumbsData} />
        
        <SpacerSecondary />
        <AppInfoViewPage />

        <SpacerPrimary />       
    </>
    </>
  )
}
