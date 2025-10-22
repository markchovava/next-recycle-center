"use client"
import CardPrimary from "@/_components/cards/CardPrimary";
import LoaderPrimary from "@/_components/loaders/LoaderPrimary";
import SpacerTertiary from "@/_components/spacers/SpacerTertiary";
import TitlePrimary from "@/_components/titles/TitlePrimary";
import { ScheduleNavData } from "@/_data/sample/ScheduleData";
import { useAccessStore } from "@/_store/useAccessStore";
import { useEffect } from "react";

const title = "Schedule"

export default function SchedulePage() {
    const { currentUser, getUserCookie, isLoading } = useAccessStore()
    
    useEffect(() => {
      getUserCookie()
    }, [getUserCookie])

    if (isLoading) {
      return (
        <section className="w-[92%] mx-auto">
          <TitlePrimary title={title} />
          <SpacerTertiary />
          <LoaderPrimary />
        </section>
      );
    }

    // Filter data based on user role
const filteredData = ScheduleNavData.filter((item) => {
  const isAdmin = currentUser?.isAdmin === "1";
  const roleLevel = String(currentUser?.roleLevel);


  if (isAdmin) {
    return true;
  }
  
  // Role Level 2: Only show "Customer Schedule"
  if (roleLevel === "2") {  // ✅ Changed to string
    return item.title === "Customer Schedule";
  }

  // Role Level 3: Only show "Recycler Schedule"
  if (roleLevel === "3") {  // ✅ Changed to string
    return item.title === "Recycler Schedule";
  }
  
  // Non-admins: Hide admin-only cards
  if (!isAdmin && 
      (item.title === "All Customers" || item.title === "All Recyclers")) {
    return false;
  }
  
  return true;
});


    console.log("currentUser", currentUser)

    return (
      <section className="mx-auto w-[92%]">
        <TitlePrimary title={`${title} ${currentUser.roleLevel}`} />
        <SpacerTertiary />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {filteredData.map((item, key) => (
            <CardPrimary key={key} dbData={item} />
          ))}
        </div>
      </section>
    )
}


