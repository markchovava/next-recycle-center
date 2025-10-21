import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import { _scheduleByRecyclerIndexAction, _scheduleOfRecyclerIndexAction } from "@/_actions/ScheduleActions"
import MyRecyclerScheduleListPage from "./_components/MyRecyclerScheduleListPage"



const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Schedule", href:"/admin/schedule"},
    {id: 3, name: "Recycler Schedule", href:"/admin/schedule/recycler"},
]


export default async function page() {
    const [ scheduleData ] = await Promise.all([ 
          _scheduleByRecyclerIndexAction()
    ]);
  
  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <MyRecyclerScheduleListPage dbData={scheduleData} />
    
    <SpacerPrimary /> 
    </>
  )
}
