import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import FaqListPage from "./_components/FaqListPage"
import { _faqListAction } from "@/_actions/FaqActions"

const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Help", href:"/admin/help"},
    {id: 3, name: "FAQs List", href:"/admin/faq"},
]

export default async function page() {
  const [ faqData ] = await Promise.all([_faqListAction()]);

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <FaqListPage dbData={faqData} />
    
    <SpacerPrimary /> 
    </>
  )
}
