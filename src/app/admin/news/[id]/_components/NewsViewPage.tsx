"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useEffect, useState } from "react";
import NewsEditModal from "./NewsEditModal";
import { NewsInterface } from "@/_data/entity/NewsEntity";
import { useNewsStore } from "@/_store/useNewsStore";
import { formatDate } from "@/_utils/formatDate";
import { BaseURL } from "@/_api/BaseURL";
import ImagePrimary from "@/_components/images/ImagePrimary";
import { useAccessStore } from "@/_store/useAccessStore";

interface NewsViewPageInterface{
  id: string | number, 
  dbData:  NewsInterface
}

export default function NewsViewPage({ id, dbData }: NewsViewPageInterface) {
  const [isModal, setIsModal] = useState<boolean>(false)
    const {data, setImage, preData, setData} = useNewsStore()
    const { currentUser, getUserCookie} = useAccessStore()
   
    useEffect(() => {
      getUserCookie()
      setData(dbData)
      const img = dbData.image ? (BaseURL + dbData.image) : "";
          if (img) {
            setImage(img)
          }
    }, [])

  return (
    <>
    <section className="w-[92%] mx-auto">
       <SpacerTertiary />
      <TitlePrimary title='View News' />
      <SpacerTertiary />
       {Number(currentUser.isAdmin) === 1 && 
       <>
        <div className="flex items-center justify-end">
          <ButtonPrimary title="Edit News" onClick={() => setIsModal(true)} />
        </div>
        <SpacerTertiary />
       </>
      }
      
      <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-2 rounded-xl">
        
        {preData.imageURL && (
            <ImagePrimary 
              src={preData.imageURL} 
              label="Image" 
            />
        )}
        {/* Corrected fields to match NewsInterface */}
        <RecordPrimary label="Title:" value={preData.title ?? 'Not added yet.'} />
        <RecordPrimary label="Status:" value={preData.status ?? 'Not added yet.'} />
        <RecordPrimary label="Priority:" value={preData.priority.toString()} />
        <RecordPrimary label="Created On:" value={formatDate(preData.createdAt) ?? 'Not added yet.'} />
        <RecordPrimary label="Last Updated:" value={formatDate(preData.updatedAt) ?? 'Not added yet.'} />
        <RecordPrimary label="User:" value={preData.user.name ?? 'Not added yet.'} />

        <SpacerTertiary />
        {/* Displaying the main content/details in a separate block for better reading */}
        <div className="pt-4 border-t border-gray-200 w-full">
            <h3 className="font-light text-lg text-gray-700 mb-2">Content</h3>
            <p className="text-gray-800 text-lg whitespace-pre-wrap">{preData.content ?? 'Not added yet.'}</p>
        </div>
      </div>
      <SpacerTertiary />
    </section>

    {/* Note: The modal is only shown if isModal is true */}
    <NewsEditModal id={id} isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}

