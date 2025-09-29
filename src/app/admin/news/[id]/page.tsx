import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import NewsViewPage from "./_components/NewsViewPage"
import { PageByIdInterface } from "@/_data/interface/PageByIdInterface"



export default function page({params: {id}}: PageByIdInterface) {

    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "Newss", href:"/admin/news"},
        {id: 4, name: "View News", href: `/admin/news/${id}`},
    ]

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <NewsViewPage id={id} />
    
    <SpacerPrimary /> 
    </>
  )
}
