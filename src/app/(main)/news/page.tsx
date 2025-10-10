import HeaderTertiary from '@/_components/headers/HeaderTertiary'
import React from 'react'
import NewsPage from './_components/NewsPage'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: `RecycleMate - News`,
  description: "The RecycleMate app",
};



export default async function page() {
  return (
    <>

    <HeaderTertiary title='News' />
    <NewsPage />
    
    </>
  )
}
