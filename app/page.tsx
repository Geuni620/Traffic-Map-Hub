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

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const [highway, seoul, incheon, tollRoad] = await Promise.all([
    supabase
      .from('highway-position')
      .select('*')
      .then((res) => res.data),
    supabase
      .from('seoul-traffic-position')
      .select('*')
      .then((res) => res.data),
    supabase
      .from('incheon-traffic-position')
      .select('*')
      .then((res) => res.data),
    supabase
      .from('toll-road')
      .select('*')
      .then((res) => res.data),
  ]);

  const combinedData = [
    ...(highway || []),
    ...(seoul || []),
    ...(incheon || []),
    ...(tollRoad || []),
  ];

  return (
    <div className="flex w-full flex-col items-center">
      <MapContainer data={combinedData} />
    </div>
  );
}
