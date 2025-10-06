
import FormRegister from "@/_components/forms/FormRegister";
import HeaderPrimary from "@/_components/headers/HeaderPrimary";
import SpacerPrimary from "@/_components/spacers/SpacerPrimary";
import { AppInfoData } from "@/_data/sample/AppInfoData";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: `${AppInfoData.name} - Register`,
  description: "The RecycleMate app",
};


export default function page() {
  return (
    <>
    <HeaderPrimary />

    <main className="w-full">
        <SpacerPrimary />
        <section className="mx-auto w-[90%] lg:w-[50%] flex items-center justify-center">
            <FormRegister />
        </section>
        <SpacerPrimary />
    </main>
    </>
  )
}
