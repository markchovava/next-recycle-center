"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useState, useEffect } from "react";
import ProfileEditModal from "./ProfileEditModal";
import { getTheCookie } from "@/_cookies/CookiesClient";

export default function ProfileViewPage() {
  const [data, setData] = useState<any>(null);
  const [isModal, setIsModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchCookieData = async () => {
      try {
        const theCookieData = await getTheCookie("RECYCLEMATE_CURRENT_USER_COOKIE");
        if (theCookieData) {
          setData(JSON.parse(theCookieData));
        }
      } catch (error) {
        console.error("Failed to fetch or parse cookie data:", error);
      }
    };

    fetchCookieData();
  }, []);

  if (!data) {
    return (
      <section className="w-[92%] mx-auto">
        <TitlePrimary title='View Profile' />
        <SpacerTertiary />
        <div className="bg-white drop-shadow p-6 rounded-xl">
          <p>Loading profile...</p>
        </div>
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
          <RecordPrimary label="Name:" value={data.name ?? "Not Added"} />
          <RecordPrimary label="Phone:" value={data.phone ?? "Not Added"} />
          <RecordPrimary label="Email:" value={data.email ?? "Not Added"} />
          <RecordPrimary label="Address:" value={data.address ?? "Not Added"} />
          <RecordPrimary label="Code:" value={data.code} />
          <RecordPrimary label="Code:" value={data.roleLevel} />
          <RecordPrimary label="Admin:" value={data.isAdmin === 1 ? "Yes" : "No"} />
        </div>
      </section>

      <ProfileEditModal isModal={isModal} setIsModal={setIsModal} />
    </>
  );
}