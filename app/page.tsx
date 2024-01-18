import { get } from 'http';
import { MapContainer } from 'lib/kakao-map';
import { type RoadType } from 'lib/kakao-map';
import { cookies } from 'next/headers';
import { Tables } from 'types/supabase';

import { createClient } from '@/utils/supabase/server';

type HighwayPositionRow = Tables<'highway-position'>;
type SeoulTrafficPositionRow = Tables<'seoul-traffic-position'>;
type IncheonTrafficPositionRow = Tables<'incheon-traffic-position'>;

type WithType<T> = T & {
  type?: string;
  source: string;
  road_type?: RoadType;
  '2021_aadt': number;
  '2022_aadt': number;
};

export type TrafficPositionWithSource =
  | WithType<HighwayPositionRow>
  | WithType<SeoulTrafficPositionRow>
  | WithType<IncheonTrafficPositionRow>;

export type MapContainerProps = {
  data: TrafficPositionWithSource[];
};

const getTrafficData = async (supabase) => {
  const res = await fetch('http://localhost:3000/api/traffic');
  const data = res.json();

  return data;
};

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const allTrafficData = await getTrafficData(supabase);

  return (
    <div className="flex w-full flex-col items-center">
      <MapContainer data={allTrafficData} />
    </div>
  );
}
