import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import CenterViewPage from "./_components/CenterViewPage"
import { PageByIdInterface } from "@/_data/interface/PageByIdInterface"
import { centerViewAction } from "@/_actions/CenterActions"



export default async function page({params: {id}}: PageByIdInterface) {
    const [ centerData ] = await Promise.all([centerViewAction(id)]);

    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "Centers", href:"/admin/center"},
        {id: 4, name: "View Center", href: `/admin/center/${id}`},
    ]

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <CenterViewPage id={id} dbData={centerData.data ?? null} />
    
    <SpacerPrimary /> 
    </>
  )
}
