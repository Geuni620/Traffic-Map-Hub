import { MapContainer } from 'components/map/map-container';
import { Tables } from 'types/supabase';

export type TrafficHub = Tables<'traffic_hub'>;

export default function Index() {
  return <MapContainer />;
}
