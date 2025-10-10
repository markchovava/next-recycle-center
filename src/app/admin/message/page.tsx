import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import MessageListPage from "./_components/MessageListPage"
import { _messageListAction } from "@/_actions/MessageActions"

const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Help", href:"/admin/help"},
    {id: 3, name: "Messages List", href:"/admin/faq"},
]

export default async function page() {
  const [ messageData ] = await Promise.all([_messageListAction()]);
  
  
  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <MessageListPage dbData={messageData} />
    
    <SpacerPrimary /> 
    </>
  )
}
