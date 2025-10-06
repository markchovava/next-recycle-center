import HeaderTertiary from '@/_components/headers/HeaderTertiary'
import React from 'react'
import ContactPage from './_components/ContactPage'
import { Metadata } from 'next';
import { AppInfoData } from '@/_data/sample/AppInfoData';


export const metadata: Metadata = {
  title: `${AppInfoData.name} - Contact Us`,
  description: "The RecycleMate app.",
};



export default function page() {
  return (
    <>
    <HeaderTertiary title='Contact Us' />
    <ContactPage />
    </>
  )
}
