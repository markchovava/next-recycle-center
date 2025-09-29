"use client"

import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import ProfileViewPage from "./_components/ProfileViewPage"


const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Settings", href:"/admin/settings"},
    {id: 4, name: "Profile", href:"/admin/profile"},
]


export default function Page() {
  return (
    <>
        <HeaderPrimary />
        <BreadCrumbs dbData={BreadCrumbsData} />
        
        <SpacerSecondary />
        <ProfileViewPage />

        <SpacerPrimary />       
    </>
  )
}
