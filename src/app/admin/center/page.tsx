import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import CenterListPage from "./_components/CenterListPage"
import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import { centerListAction } from "@/_actions/CenterActions"


const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Centers", href:"/admin/center"},
]


export default async function page() {
  const [ centerData ] = await Promise.all([centerListAction()]);

  
  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <CenterListPage dbData={centerData} /> 
    
    <SpacerPrimary /> 
    </>
  )
}
