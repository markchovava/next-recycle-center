"use client"
import ButtonPrimary from '@/_components/buttons/ButtonPrimary'
import RecordPrimary from '@/_components/records/RecordPrimary'
import SpacerTertiary from '@/_components/spacers/SpacerTertiary'
import TitlePrimary from '@/_components/titles/TitlePrimary'
import { AppInfoData } from '@/_data/sample/AppInfoData'
import React from 'react'
import AppInfoEditModal from './AppInfoEditModal'




export default function AppInfoViewPage() {
    const [data, setData] = React.useState(AppInfoData)
    const [isModal, setIsModal] = React.useState(false)
  return (
    <>
    <section className='mx-auto w-[92%]'>
        <TitlePrimary title='View App Information' />
        <SpacerTertiary />
        <div className="flex items-center justify-end">
            <ButtonPrimary title="Edit App Information" onClick={() => setIsModal(!isModal)} />
        </div>

         <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-4 rounded-xl">
            <RecordPrimary label="Name:" value={data.name} />
            <RecordPrimary label="Phone:" value={data.phone} />
            <RecordPrimary label="Email:" value={data.email} />
            <RecordPrimary label="Address:" value={data.address} />
            <RecordPrimary label="Facebook:" value={data.facebook} />
            <RecordPrimary label="Tiktok:" value={data.tiktok} />
            <RecordPrimary label="Instagram:" value={data.instagram} />
            <RecordPrimary label="Twitter:" value={data.twitter} />
            <RecordPrimary label="WhatsApp:" value={data.whatsapp} />
            <RecordPrimary label="Description:" value={data.description} />
        </div>
    </section>

    <AppInfoEditModal isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}
