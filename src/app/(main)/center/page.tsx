import HeaderTertiary from '@/_components/headers/HeaderTertiary'
import React from 'react'
import CenterPage from './_components/CenterPage'
import { Metadata } from 'next';
import { AppInfoData } from '@/_data/sample/AppInfoData';
import { centerListAction } from '@/_actions/CenterActions';


export const metadata: Metadata = {
  title: `${AppInfoData.name} - Centers`,
  description: "The RecycleMate app.",
};


export default async function page() {
  const [ centerData ] = await Promise.all([centerListAction() ]);

  return (
    <>
    <HeaderTertiary title='Recycle Centers' />
    <CenterPage centerData={centerData} />
    </>
  )
}
