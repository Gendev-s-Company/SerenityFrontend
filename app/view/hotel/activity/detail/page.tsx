"use client";
import ActivityPrice from "@/features/hotel/activity/activityPrice/ActivityPrice";
import DetailActivity from "@/features/hotel/activity/detailActivity/detailActivity";
import PhotoDetailActivity from "@/features/hotel/activity/detailActivity/PhotoDetailActivity";
import { useSearchParams } from "next/navigation";

const page = () => {
  const activityID = useSearchParams().get('activityID');
  return (
    <div>
      <div><DetailActivity activityId={activityID || ""} /></div>
      <div><PhotoDetailActivity activityId={activityID || ""} /></div>
      <div><ActivityPrice activityId={activityID || ""} /></div>

    </div>
  )
}

export default page