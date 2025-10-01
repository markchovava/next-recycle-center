import HeaderSecondary from "@/_components/headers/HeaderSecondary";
import SpacerPrimary from "@/_components/spacers/SpacerPrimary";
import { FaTruckPickup, FaRecycle } from "react-icons/fa6";
import HomePage from "./_components/HomePage";





export default function Home() {
  return (
   <>
   <HeaderSecondary />

   <SpacerPrimary />
   <HomePage />


   <SpacerPrimary />
   </>
  );
}
