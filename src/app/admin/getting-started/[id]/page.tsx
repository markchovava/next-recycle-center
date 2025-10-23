import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import FaqViewPage from "./_components/GettingStartedViewPage"
import { PageByIdInterface } from "@/_data/interface/PageByIdInterface"
import { _gettingStartedViewAction } from "@/_actions/GettingStartedActions"



export default async function page({params: {id}}: PageByIdInterface) {
    const [ gsData ] = await Promise.all([_gettingStartedViewAction(id)]);

    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 2, name: "Help", href:"/admin/help"},
        {id: 3, name: "Getting Started", href:"/admin/getting-started"},
        {id: 4, name: "View Getting Started", href: `/admin/getting-started/${id}`},
    ]

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <FaqViewPage id={id} dbData={gsData?.data} />
    
    <SpacerPrimary /> 
    </>
  )
}
