// import { MapContainer } from 'lib/kakao-map';
import { MapContainer } from 'components/map/map-container';
import { Tables } from 'types/supabase';

export type TrafficHub = Tables<'traffic_hub'>;

export default async function Index() {
  return (
    <div className="flex w-full flex-col items-center">
      <MapContainer />
    </div>
  );
}
