"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useState, useEffect } from "react";
import ProfileEditModal from "./ProfileEditModal";
import { getTheCookie } from "@/_cookies/CookiesClient";
import LoaderPrimary from "@/_components/loaders/LoaderPrimary";
import { RolesData } from "@/_data/sample/RolesData";
import { useAuthStore } from "@/_store/useAuthStore";
import { AuthInterface } from "@/_data/entity/AuthEntity";




export default function ProfileViewPage({dbData}: {dbData: AuthInterface} ) {
  const { data, preData, setData, fetchAuthCookie, isLoading, setRole } = useAuthStore()
  const [isModal, setIsModal] = useState<boolean>(false);


  console.log(dbData)
  

  useEffect(() => {
    setData(dbData)
    setRole(dbData.roleLevel)

  }, []);


  if (isLoading) {
    return (
      <section className="w-[92%] mx-auto">
        <TitlePrimary title='View Profile' />
        <SpacerTertiary />
        <LoaderPrimary />
      </section>
    );
  }


  return (
    <>
      <section className="w-[92%] mx-auto">
        <TitlePrimary title='View Profile' />
        <SpacerTertiary />
        <div className="flex items-center justify-end">
          <ButtonPrimary title="Edit Profile" onClick={() => setIsModal(!isModal)} />
        </div>
        <SpacerTertiary />
        <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-4 rounded-xl">
          
          <RecordPrimary label="Name:" value={preData.name ?? "Not Added"} />
          <RecordPrimary label="Phone:" value={preData.phone ?? "Not Added"} />
          <RecordPrimary label="Email:" value={preData.email ?? "Not Added"} />
          <RecordPrimary label="Address:" value={preData.address ?? "Not Added"} />
          <RecordPrimary label="Code:" value={preData.code} />
          <RecordPrimary label="Role:" value={preData.role || "Not Added"} />
          <RecordPrimary label="Admin:" value={data.isAdmin === 1 ? "Yes" : "No"} />
        </div>
      </section>

      <ProfileEditModal isModal={isModal} setIsModal={setIsModal} />
    </>
  );
}