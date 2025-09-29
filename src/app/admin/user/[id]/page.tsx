import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import UserViewPage from "./_components/UserViewPage"
import { PageByIdInterface } from "@/_data/interface/PageByIdInterface"



export default function page({params: {id}}: PageByIdInterface) {

    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "Users", href:"/admin/user"},
        {id: 4, name: "View User", href: `/admin/user/${id}`},
    ]

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <UserViewPage id={id} />
    
    <SpacerPrimary /> 
    </>
  )
}
