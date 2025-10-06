import HeaderSecondary from "@/_components/headers/HeaderSecondary";
import HomePage from "./_components/HomePage";
import { Metadata } from "next";
import { AppInfoData } from "@/_data/sample/AppInfoData";


export const metadata: Metadata = {
  title: `${AppInfoData.name} - Home`,
  description: "The RecycleMate app",
};


export default function Home() {
  return (
   <>
   <HeaderSecondary />
   
   <HomePage />

  
   </>
  );
}
