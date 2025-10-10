"use client"
import ButtonPrimary from "@/_components/buttons/ButtonPrimary";
import RecordPrimary from "@/_components/records/RecordPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { useEffect, useState } from "react";
import UserEditModal from "./UserEditModal";
import { UserInterface } from "@/_data/entity/UserEntity";
import { useUserStore } from "@/_store/useUserStore";
import { UserRole } from "@/_data/sample/RolesData";


interface UserViewPageInterface{
  id: string | number, 
  dbData: UserInterface
} 

export default function UserViewPage({ id, dbData }: UserViewPageInterface) {
  const [isModal, setIsModal] = useState<boolean>(false)
  const {data, preData, setData} = useUserStore()
  useEffect(() => {
    setData(dbData)
  }, [])

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
        <RecordPrimary label="Name:" value={preData.name ?? "Not yet added"} />
        <RecordPrimary label="Phone:" value={preData.phone ?? "Not yet added"} />
        <RecordPrimary label="Email:" value={preData.email ?? "Not yet added"} />
        <RecordPrimary label="Address:" value={preData.address ?? "Not yet added"} />
        <RecordPrimary label="Code:" value={preData.code ?? "Not yet added"} />
        <RecordPrimary label="Admin:" value={preData.isAdmin ? "Yes" : "No"} />
        <RecordPrimary label="Admin:" value={UserRole(preData.roleLevel) ?? "Not added yet."} />
      </div>
    </section>

    <UserEditModal id={id} isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}
