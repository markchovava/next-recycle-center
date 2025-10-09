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




export default function ProfileViewPage() {
  const { data, preData, setData, fetchAuthCookie, isLoading } = useAuthStore()
  const [role, setRole] = useState("");
  const [isModal, setIsModal] = useState<boolean>(false);

  useEffect(() => {
    fetchAuthCookie();
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