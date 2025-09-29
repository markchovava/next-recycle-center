import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'
import SpacerPrimary from '@/_components/spacers/SpacerPrimary'
import React from 'react'
import AdminPage from './_components/AdminPage'
import HeaderPrimary from '@/_components/headers/HeaderPrimary'
import SpacerSecondary from '@/_components/spacers/SpacerSecondary'

const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
]


export default function page() {
  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />
    
    <SpacerSecondary />
    <AdminPage />
    <SpacerPrimary />
    </>
  )
}
