"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useState } from "react";
import { CenterData } from "@/_data/sample/CenterData";
import TitleSecondary from "@/_components/titles/TitleSecondary";
import BorderPrimary from "@/_components/border/BorderPrimary";
import { CenterInterface } from "@/_data/interface/CenterInterface";
import CenterEditModal from "./CenterEditModal";




// --- END: Interface and Sample Data Definitions ---


export default function CenterViewPage({ id }: { id: string | number }) {
  // Find the center item using the ID
  const centerItem = CenterData.find(i => i.id === parseInt(id as string));

  // State to hold the center data and control the modal
  const [data, setData] = useState<CenterInterface | undefined>(centerItem); 
  const [isModal, setIsModal] = useState(false);

  // Handle case where no center is found
  if (!data) {
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
        <TitlePrimary title={`View Center: ${data.name}`} />
        <SpacerTertiary />
        <div className="flex items-center justify-end">
          {/* Note: In a real app, you would pass setData and data to the modal for update */}
          <ButtonPrimary title="Edit Center" onClick={() => setIsModal(true)} /> 
        </div>
        <SpacerTertiary />

        <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-2 rounded-xl">

          <TitleSecondary title="Contact Details" />

          {/* Section 1: Identifiers and Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pb-4">
            <RecordPrimary label="Center ID:" value={data.id.toString()} />
            <RecordPrimary label="User ID (Owner):" value={data.userId.toString()} />
            <RecordPrimary label="Name:" value={data.name} />
            <RecordPrimary label="Phone:" value={data.phone} />
            <RecordPrimary label="Email:" value={data.email} />
            <RecordPrimary label="Created On:" value={data.createdAt} />
            <RecordPrimary label="Last Updated:" value={data.updatedAt} />
          </div>
          <BorderPrimary />

          {/* Section 2: Location Details */}
          <TitleSecondary title="Location" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pb-4">
            <RecordPrimary label="Address:" value={data.address} />
            <RecordPrimary label="City:" value={`${data.city}, ${data.province}`} />
            <RecordPrimary label="Postal Code:" value={data.postalCode} />
            <RecordPrimary label="Coordinates:" value={`Lat: ${data.latitude}, Long: ${data.longitude}`} />
          </div>
          <BorderPrimary />

          {/* Section 3: Operating Hours */}
          <TitleSecondary title="Operating Hours" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pb-4">
            <RecordPrimary label="Weekday Hours:" value={`${data.weekdayOpenTime} - ${data.weekdayCloseTime}`} />
            <RecordPrimary label="Weekend Hours:" value={`${data.weekendOpenTime} - ${data.weekendCloseTime}`} />
            <RecordPrimary label="Holiday Hours:" value={
              data.holidayOpenTime === "00:00" && data.holidayCloseTime === "00:00" 
              ? "Closed" 
              : `${data.holidayOpenTime} - ${data.holidayCloseTime}`
            } />
          </div>
          <BorderPrimary />


          {/* Section 4: Description/Details */}
          <div className="pt-4 w-full">
            <h3 className="font-semibold text-xl text-gray-700 mb-2">Description</h3>
            <p className="text-gray-800 text-lg whitespace-pre-wrap p-4 bg-gray-50 rounded-lg">{data.description}</p>
          </div>
        </div>
        <SpacerTertiary />
      </section>

      {/* Note: The modal is only shown if isModal is true */}
      {/* In a real app, CenterEditModal needs to accept and handle CenterInterface data. */}
      <CenterEditModal isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}