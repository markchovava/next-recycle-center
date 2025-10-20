import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import { PageByIdInterface } from "@/_data/interface/PageByIdInterface"
import RecyclerScheduleViewPage from "./_components/RecyclerScheduleViewPage"
import { _scheduleViewAction } from "@/_actions/ScheduleActions"



export default async function page({params: {id}}: PageByIdInterface) {
    const [ scheduleData ] = await Promise.all([_scheduleViewAction(id)]);

    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "Schedules", href:"/admin/schedule"},
        {id: 3, name: "Recycler Schedule List", href:"/admin/schedule/recycler"},
        {id: 4, name: "View Schedule", href: `/admin/schedule/recycler/${id}`},
    ]

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <RecyclerScheduleViewPage id={id} dbData={scheduleData.data} />
    
    <SpacerPrimary /> 
    </>
  )
}
