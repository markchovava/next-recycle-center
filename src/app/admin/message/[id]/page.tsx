import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import MessageViewPage from "./_components/MessageViewPage"
import { PageByIdInterface } from "@/_data/interface/PageByIdInterface"



export default function page({params: {id}}: PageByIdInterface) {

    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 2, name: "Help", href:"/admin/help"},
        {id: 3, name: "Messages", href:"/admin/message"},
        {id: 4, name: "View Message", href: `/admin/message/${id}`},
    ]

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <MessageViewPage id={id} />
    
    <SpacerPrimary /> 
    </>
  )
}
