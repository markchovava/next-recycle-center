import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import { _scheduleByCustomerIndexAction } from "@/_actions/ScheduleActions"
import { centerAllAction } from "@/_actions/CenterActions"
import MyCustomerScheduleListPage from "./_components/MyCustomerScheduleListPage"


const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Schedule", href:"/admin/schedule"},
    {id: 3, name: "My Schedule (Customer)", href:"/admin/schedule/my/customer"},
]
 

export default async function page() {
  const [ scheduleData, centerData ] = await Promise.all([ 
        _scheduleByCustomerIndexAction(), 
        centerAllAction() 
  ]);


  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <MyCustomerScheduleListPage 
        dbData={scheduleData} 
        centerData={centerData.data} />
    
    <SpacerPrimary /> 
    </>
  )
}
