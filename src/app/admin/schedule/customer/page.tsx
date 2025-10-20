import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import CustomerScheduleListPage from "./_components/CustomerScheduleListPage"
import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import { _scheduleOfCustomerIndexAction } from "@/_actions/ScheduleActions"
import { centerAllAction } from "@/_actions/CenterActions"


const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Schedule", href:"/admin/schedule"},
    {id: 3, name: "Customer Schedule", href:"/admin/schedule/customer"},
]


export default async function page() {
  const [ scheduleData, centerData ] = await Promise.all([ 
        _scheduleOfCustomerIndexAction(), 
        centerAllAction() 
  ]);


  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <CustomerScheduleListPage 
        dbData={scheduleData} 
        centerData={centerData.data} />
    
    <SpacerPrimary /> 
    </>
  )
}
