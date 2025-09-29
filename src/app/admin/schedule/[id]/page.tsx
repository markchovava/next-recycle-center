import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import { PageByIdInterface } from "@/_data/interface/PageByIdInterface"
import ScheduleViewPage from "./_components/ScheduleViewPage"



export default function page({params: {id}}: PageByIdInterface) {

    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "Schedules", href:"/admin/user"},
        {id: 4, name: "View Schedule", href: `/admin/user/${id}`},
    ]

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <ScheduleViewPage id={id} />
    
    <SpacerPrimary /> 
    </>
  )
}
