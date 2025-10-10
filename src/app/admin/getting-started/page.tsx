import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import FaqListPage from "./_components/GettingStartedListPage"
import { _gettingStartedListAction } from "@/_actions/GettingStartedActions"


const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Help", href:"/admin/help"},
    {id: 3, name: "Getting Started List", href:"/admin/getting-started"},
]


export default async function page() {
  const [ gsData ] = await Promise.all([_gettingStartedListAction()]);

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <FaqListPage dbData={gsData} />
    
    <SpacerPrimary /> 
    </>
  )
}
