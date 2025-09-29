
import FormLogin from "@/_components/forms/FormLogin";
import HeaderPrimary from "@/_components/headers/HeaderPrimary";
import SpacerPrimary from "@/_components/spacers/SpacerPrimary";


export default function page() {
  return (
    <>
    <HeaderPrimary />

    <main className="w-full">
        <SpacerPrimary />
        <section className="mx-auto w-[90%] lg:w-[50%] flex items-center justify-center">
            <FormLogin />
        </section>
        <SpacerPrimary />
    </main>
    </>
  )
}
