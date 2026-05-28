import Room from "@/features/hotel/room/Room";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chambres',
}

const page = () => {
  return (
    <div className="p-5">
      <Room />
    </div>
  );
};

export default page;
