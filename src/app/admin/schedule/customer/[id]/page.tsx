import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import { PageByIdInterface } from "@/_data/interface/PageByIdInterface"
import { _scheduleViewAction } from "@/_actions/ScheduleActions"
import CustomerScheduleViewPage from "./_components/CustomerScheduleViewPage"



export default async function page({params: {id}}: PageByIdInterface) {
    const [ scheduleData ] = await Promise.all([_scheduleViewAction(id)]);

    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "Schedules", href:"/admin/schedule"},
        {id: 3, name: "Customer Schedule List", href:"/admin/schedule/customer"},
        {id: 4, name: "View Schedule", href: `/admin/schedule/${id}`},
    ]

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <CustomerScheduleViewPage 
        id={id} 
        dbData={scheduleData.data} 
    />
    
    <SpacerPrimary /> 
    </>
  )
}
