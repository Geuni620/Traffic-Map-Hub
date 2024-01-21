import { MapContainer } from 'lib/kakao-map';
import { Tables } from 'types/supabase';

export type TrafficHub = Tables<'traffic_hub'>;

// const getTrafficData = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/traffic`);
//   const data = res.json();

//   return data;
// };

export default async function Index() {
  // const allTrafficData = await getTrafficData();

  return (
    <div className="flex w-full flex-col items-center">
      <MapContainer />
    </div>
  );
}
