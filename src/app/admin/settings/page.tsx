import BreadCrumbs from '@/_components/breadcrumbs/BreadCrumbs'
import HeaderPrimary from '@/_components/headers/HeaderPrimary'
import SpacerPrimary from '@/_components/spacers/SpacerPrimary'
import SpacerSecondary from '@/_components/spacers/SpacerSecondary'
import React from 'react'
import SettingsPage from './_components/SettingsPage'

const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 2, name: "Settings", href:"/admin/settings"},
]

export default function page() {
  return (
    <>
        <HeaderPrimary />
        <BreadCrumbs dbData={BreadCrumbsData} />
        
        <SpacerSecondary />
        <SettingsPage />
        <SpacerPrimary />
    </>
  )
}
