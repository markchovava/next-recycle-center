"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useState } from "react";
import UserEditModal from "./UserEditModal";


const UserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, USA",
  code: "1234567890",
  isAdmin: true
}

export default function UserViewPage({ id }: { id: string | number }) {
  const [data, setData] = useState(UserData)
  const [isModal, setIsModal] = useState<boolean>(false)

  return (
    <>
    <section className="w-[92%] mx-auto">
      <TitlePrimary title='View User' />
      <SpacerTertiary />
      <div className="flex items-center justify-end">
        <ButtonPrimary title="Edit User" onClick={() => setIsModal(!isModal)} />
      </div>
      <SpacerTertiary />
      <div className="bg-white drop-shadow p-6 flex flex-col items-start justify-center gap-4 rounded-xl">
        <RecordPrimary label="Name:" value={data.name} />
        <RecordPrimary label="Phone:" value={data.phone} />
        <RecordPrimary label="Email:" value={data.email} />
        <RecordPrimary label="Address:" value={data.address} />
        <RecordPrimary label="Code:" value={data.code} />
        <RecordPrimary label="Admin:" value={data.isAdmin ? "Yes" : "No"} />
      </div>
    </section>

    <UserEditModal isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}
