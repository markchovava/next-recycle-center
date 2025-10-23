"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useEffect, useState } from "react";
import { CenterData } from "@/_data/sample/CenterData";
import TitleSecondary from "@/_components/titles/TitleSecondary";
import BorderPrimary from "@/_components/border/BorderPrimary";
import CenterEditModal from "./CenterEditModal";
import { CenterInterface } from "@/_data/entity/CenterEntity";
import { useCenterStore } from "@/_store/useCenterStore";
import LoaderPrimary from "@/_components/loaders/LoaderPrimary";
import { BaseURL } from "@/_api/BaseURL";
import ImagePrimary from "@/_components/images/ImagePrimary";
import { formatDate } from "@/_utils/formatDate";
import { useAccessStore } from "@/_store/useAccessStore";




interface CenterViewPageInterface{
    id: string | number,
    dbData: CenterInterface,
}


export default function CenterViewPage({ id, dbData }: CenterViewPageInterface ) {
  const noImage = "/assets/img/no_photo.jpg"
  // Find the center item using the ID
  const {
      data, 
      preData, 
      setData, 
      isLoading, 
      setImage
  } = useCenterStore()
  const { currentUser, getUserCookie} = useAccessStore()


 useEffect(() => {
    getUserCookie()
    setData(dbData)
    const img = dbData.image ? (BaseURL + dbData.image) : "";
    if (img) {
      setImage(img)
    }
  }, [])
  const [isModal, setIsModal] = useState(false);


  if (isLoading) {
        return (
          <section className="w-[92%] mx-auto">
            <TitlePrimary title='View Recycle Center' />
            <SpacerTertiary />
            <LoaderPrimary />
          </section>
        );
    }

  // Handle case where no center is found
  if (!preData) {
    return (
      <section className="w-[92%] mx-auto py-12">
        <TitlePrimary title='Service Center Not Found' />
        <p className="text-lg text-red-600">The service center with ID: {id} could not be located.</p>
      </section>
    );
  }



  return (
    <>
      <section className="w-[92%] mx-auto">
        <SpacerTertiary />
        <TitlePrimary title={`View Center: ${preData.name ?? ""}`} />
        <SpacerTertiary />
        {Number(currentUser.roleLevel) === 3 || Number(currentUser.isAdmin) === 1 &&
        <>
          <div className="flex items-center justify-end">
            <ButtonPrimary title="Edit Center" onClick={() => setIsModal(true)} /> 
          </div>
          <SpacerTertiary />
        </>}

        <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-2 rounded-xl">

          <TitleSecondary title="Contact Details" />

          {/* Section 1: Identifiers and Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pb-4">
            {preData.imageURL && (
              <ImagePrimary 
                src={preData.imageURL ? preData.imageURL : noImage} 
                label="Image" 
              />
            )}
            <RecordPrimary label="Center ID:" value={preData.id ?? "Not Added yet."} />
            <RecordPrimary label="User (Owner):" value={preData.user.name ?? preData.user.email ?? "Not Added yet."} />
            <RecordPrimary label="Name:" value={preData.name ?? "Not Added yet."} />
            <RecordPrimary label="Phone:" value={preData.phone ?? "Not Added yet."} />
            <RecordPrimary label="Email:" value={preData.email ?? "Not Added yet."} />
            <RecordPrimary 
              label="Created On:" 
              value={preData.createdAt ? formatDate(preData.createdAt) : "Not Added yet."} />
            <RecordPrimary 
              label="Last Updated:" 
              value={preData.updatedAt ? formatDate(preData.updatedAt) : "Not Added yet."} />
          </div>
          <BorderPrimary />

          {/* Section 2: Location Details */}
          <TitleSecondary title="Location" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pb-4">
            <RecordPrimary label="Address:" value={preData.address ?? "Not Added yet."} />
            <RecordPrimary label="City:" value={`${preData.city}, ${preData.province?? "Not Added yet."}`} />
            <RecordPrimary label="Postal Code:" value={preData.postalCode ?? "Not Added yet."} />
            <RecordPrimary label="Coordinates:" value={
              `Lat: ${preData.latitude?? "Not Added yet."}, 
              Long: ${preData.longitude ?? "Not Added yet."}`} />
          </div>
          <BorderPrimary />

          {/* Section 3: Operating Hours */}
          <TitleSecondary title="Operating Hours" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pb-4">
            <RecordPrimary label="Weekday Hours:" value={`${preData.weekdayOpenTime?? "--:--"} - ${preData.weekdayCloseTime ?? "--:--"}`} />
            <RecordPrimary label="Weekend Hours:" value={`${preData.weekendOpenTime?? "--:--"} - ${preData.weekendCloseTime ?? "--:--"}`} />
            <RecordPrimary label="Holiday Hours:" value={
              preData.holidayOpenTime === "00:00" && preData.holidayCloseTime === "00:00" 
              ? "Closed" 
              : `${preData.holidayOpenTime ?? "--:--"} - ${preData.holidayCloseTime ?? "--:--"}`
            } />
          </div>
          <BorderPrimary />


          {/* Section 4: Description/Details */}
          <div className="pt-4 w-full">
            <h3 className="font-semibold text-xl text-gray-700 mb-2">Description</h3>
            <p className="text-gray-800 text-lg whitespace-pre-wrap p-4 bg-gray-50 rounded-lg">
              {preData.description ?? "Not added yet."}
            </p>
          </div>
        </div>
        <SpacerTertiary />
      </section>

      {/* Note: The modal is only shown if isModal is true */}
      {/* In a real app, CenterEditModal needs to accept and handle CenterInterface data. */}
      <CenterEditModal id={id} isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}