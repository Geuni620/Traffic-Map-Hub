import { MapContainer } from 'lib/kakao-map';
import { cookies } from 'next/headers';
import { Tables } from 'types/supabase';

import { createClient } from '@/utils/supabase/server';

type HighwayPositionRow = Tables<'highway-position'>;
type SeoulTrafficPositionRow = Tables<'seoul-traffic-position'>;
type IncheonTrafficPositionRow = Tables<'incheon-traffic-position'>;

type WithSource<T, SourceType extends string> = T & { source: SourceType };
type HighwayPositionWithSource = WithSource<HighwayPositionRow, 'highway'>;
type SeoulTrafficPositionWithSource = WithSource<
  SeoulTrafficPositionRow,
  'seoul'
>;
type IncheonTrafficPositionWithSource = WithSource<
  IncheonTrafficPositionRow,
  'incheon'
>;

export type MapContainerProps = {
  data: (
    | HighwayPositionWithSource
    | SeoulTrafficPositionWithSource
    | IncheonTrafficPositionWithSource
  )[];
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
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <MapContainer data={combinedData} />
    </div>
  );
}
