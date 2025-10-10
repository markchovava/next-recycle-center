import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import NewsViewPage from "./_components/NewsViewPage"
import { PageByIdInterface } from "@/_data/interface/PageByIdInterface"
import { _newsViewAction } from "@/_actions/NewsActions"



export default async function page({params: {id}}: PageByIdInterface) {
    const [ newsData ] = await Promise.all([_newsViewAction(id)]);


    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "News", href:"/admin/news"},
        {id: 4, name: "View News", href: `/admin/news/${id}`},
    ]

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <NewsViewPage id={id} dbData={newsData.data} />
    
    <SpacerPrimary /> 
    </>
  )
}
