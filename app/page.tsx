import { MapContainer } from 'lib/kakao-map';
import { cookies } from 'next/headers';
import { Tables } from 'types/supabase';

import { createClient } from '@/utils/supabase/server';

type HighwayPositionRow = Tables<'highway-position'>;
type SeoulTrafficPositionRow = Tables<'seoul-traffic-position'>;
type IncheonTrafficPositionRow = Tables<'incheon-traffic-position'>;

type WithType<T> = T & { type?: string; source: string };

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
  const [highway, seoul, incheon] = await Promise.all([
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
  ]);

  const combinedData = [
    ...(highway || []),
    ...(seoul || []),
    ...(incheon || []),
  ];

  return (
    <div className="flex w-full flex-col items-center">
      <MapContainer data={combinedData} />
    </div>
  );
}
