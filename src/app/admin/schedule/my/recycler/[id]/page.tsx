import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import { PageByIdInterface } from "@/_data/interface/PageByIdInterface"
import { _scheduleViewAction } from "@/_actions/ScheduleActions"
import MyRecyclerScheduleViewPage from "./_components/MyRecyclerScheduleViewPage"



export default async function page({params: {id}}: PageByIdInterface) {
    const [ scheduleData ] = await Promise.all([_scheduleViewAction(id)]);

    const BreadCrumbsData = [
        {id: 1, name: "Home", href:"/"},
        {id: 2, name: "Dashboard", href:"/admin"},
        {id: 3, name: "Schedules", href:"/admin/schedule"},
        {id: 3, name: "My Schedule (Recycler)", href:"/admin/schedule/my/recycler"},
        {id: 4, name: "View Schedule (Recycler)", href: `/admin/schedule/my/recycler/${id}`},
    ]

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <MyRecyclerScheduleViewPage id={id} dbData={scheduleData.data} />
    
    <SpacerPrimary /> 
    </>
  )
}
