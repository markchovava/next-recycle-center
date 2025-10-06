import HeaderTertiary from '@/_components/headers/HeaderTertiary'
import React from 'react'
import NewsPage from './_components/NewsPage'
import { Metadata } from 'next';
import { AppInfoData } from '@/_data/sample/AppInfoData';


export const metadata: Metadata = {
  title: `${AppInfoData.name} - News`,
  description: "The RecycleMate app",
};



export default function page() {
  return (
    <>

    <HeaderTertiary title='News' />
    <NewsPage />
    
    </>
  )
}
