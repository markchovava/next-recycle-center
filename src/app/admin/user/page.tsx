import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import UserListPage from "./_components/UserListPage"
import SpacerSecondary from "@/_components/spacers/SpacerSecondary"

const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "Users", href:"/admin/user"},
]

export default function page() {
  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <UserListPage />
    
    <SpacerPrimary /> 
    </>
  )
}
