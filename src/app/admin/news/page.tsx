import BreadCrumbs from "@/_components/breadcrumbs/BreadCrumbs"
import HeaderPrimary from "@/_components/headers/HeaderPrimary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"
import NewsListPage from "./_components/NewsListPage"
import SpacerSecondary from "@/_components/spacers/SpacerSecondary"
import { _newsListAction } from "@/_actions/NewsActions"

const BreadCrumbsData = [
    {id: 1, name: "Home", href:"/"},
    {id: 2, name: "Dashboard", href:"/admin"},
    {id: 3, name: "News", href:"/admin/news"},
]

export default async function page() {
  const [ newsData ] = await Promise.all([_newsListAction()]);

  return (
    <>
    <HeaderPrimary />
    <BreadCrumbs dbData={BreadCrumbsData} />

    <SpacerSecondary />
    <NewsListPage dbData={newsData} />
    
    <SpacerPrimary /> 
    </>
  )
}
