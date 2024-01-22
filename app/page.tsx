import { MapContainer } from 'lib/kakao-map';
import { Tables } from 'types/supabase';

export type TrafficHub = Tables<'traffic_hub'>;

export default async function Index() {
  return (
    <div className="flex w-full flex-col items-center">
      <MapContainer />
    </div>
  );
}
