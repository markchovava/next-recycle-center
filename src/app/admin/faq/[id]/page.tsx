import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import FaqViewPage from "./_components/FaqViewPage"
import { PageByIdInterface } from "@/_data/interface/PageByIdInterface"
import { _faqViewAction } from "@/_actions/FaqActions"



export default async function page({params: {id}}: PageByIdInterface) {
    const [ faqData ] = await Promise.all([_faqViewAction(id)]);

    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 2, name: "Help", href:"/admin/help"},
        {id: 3, name: "Faqs", href:"/admin/faq"},
        {id: 4, name: "View Faq", href: `/admin/faq/${id}`},
    ]

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <FaqViewPage id={id} dbData={faqData.data} />
    
    <SpacerPrimary /> 
    </>
  )
}
