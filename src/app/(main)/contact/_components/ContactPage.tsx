"use client"

import FormContactSecondary from "@/_components/forms/FormContactSecondary"
import SpacerPrimary from "@/_components/spacers/SpacerPrimary"

export default function ContactPage() {
  return (
    <>
    <SpacerPrimary />
    <section className="mx-auto w-[60%]">
        <FormContactSecondary />
    </section>
    <SpacerPrimary />
    </>
  )
}
