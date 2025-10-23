import HeaderTertiary from '@/_components/headers/HeaderTertiary'
import React from 'react'
import NewsPage from './_components/NewsPage'
import { Metadata } from 'next';
import { _newsListAction, newsListAction, newsPriorityStatusListAction } from '@/_actions/NewsActions';


export const metadata: Metadata = {
  title: `RecycleMate - News`,
  description: "The RecycleMate app",
};



export default async function page() {
  const [ newsData ] = await Promise.all([newsPriorityStatusListAction()]);

  return (
    <>
    <HeaderTertiary title='News' />
    <NewsPage dbData={newsData} />
    
    </>
  )
}
