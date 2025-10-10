import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import ProfileViewPage from "./_components/ProfileViewPage"
import { _authViewAction } from "@/_actions/AuthActions"



const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Settings", href:"/admin/settings"},
    {id: 4, name: "Profile", href:"/admin/profile"},
]


export default async function Page() {
  const [ authData ] = await Promise.all([_authViewAction()]);

  return (
    <>
        <HeaderPrimary />
        <BreadCrumbs dbData={BreadCrumbsData} />
        
        <SpacerSecondary />
        <ProfileViewPage dbData={authData.data} />

        <SpacerPrimary />       
    </>
  )
}
