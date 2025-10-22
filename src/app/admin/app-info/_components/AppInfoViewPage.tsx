"use client"
import ButtonPrimary from '@/_components/buttons/ButtonPrimary'
import RecordPrimary from '@/_components/records/RecordPrimary'
import SpacerTertiary from '@/_components/spacers/SpacerTertiary'
import TitlePrimary from '@/_components/titles/TitlePrimary'
import { AppInfoData } from '@/_data/sample/AppInfoData'
import React, { useEffect } from 'react'
import AppInfoEditModal from './AppInfoEditModal'
import { AppInfoInterface } from '@/_data/entity/AppInfoEntity'
import { useAppInfoStore } from '@/_store/useAppInfoStore'
import LoaderPrimary from '@/_components/loaders/LoaderPrimary'
import { useAccessStore } from '@/_store/useAccessStore'



const title = "App Information"

export default function AppInfoViewPage({dbData}: {dbData: AppInfoInterface}) {
    const {setData, preData, isLoading} = useAppInfoStore()
    const { currentUser, setCurrentUser, getUserCookie} = useAccessStore()
    const [isModal, setIsModal] = React.useState(false)

    useEffect(() => {
      getUserCookie()
      setData(dbData)
    }, [])

     if (isLoading) {
            return (
              <section className="w-[92%] mx-auto">
                <TitlePrimary title={title} />
                <SpacerTertiary />
                <LoaderPrimary />
              </section>
            );
        }

  return (
    <>
    <section className='mx-auto w-[92%]'>
        <TitlePrimary title={title} />
        <SpacerTertiary />
        {Number(currentUser.isAdmin) == 1 && 
        <>
          <div className="flex items-center justify-end">
              <ButtonPrimary title="Edit App Information" onClick={() => setIsModal(!isModal)} />
          </div>
          <SpacerTertiary />
        </>
        }

         <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-4 rounded-xl">
            <RecordPrimary label="Name:" value={preData.name ?? "Not yet Added"} />
            <RecordPrimary label="Phone:" value={preData.phone ?? "Not yet Added"} />
            <RecordPrimary label="Email:" value={preData.email ?? "Not yet Added"} />
            <RecordPrimary label="Address:" value={preData.address ?? "Not yet Added"} />
            <RecordPrimary label="Facebook:" value={preData.facebook ?? "Not yet Added" } />
            <RecordPrimary label="Tiktok:" value={preData.tiktok ?? "Not yet Added"} />
            <RecordPrimary label="Instagram:" value={preData.instagram ?? "Not yet Added"} />
            <RecordPrimary label="Twitter:" value={preData.twitter ?? "Not yet Added"} />
            <RecordPrimary label="WhatsApp:" value={preData.whatsapp ?? "Not yet Added"} />
            <RecordPrimary label="Description:" value={preData.description ?? "Not yet Added"} />
        </div>
    </section>

    <AppInfoEditModal isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}
