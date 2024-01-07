import { MapContainer } from 'lib/kakao-map';
import { cookies } from 'next/headers';
import { Tables } from 'types/supabase';

import { createClient } from '@/utils/supabase/server';

type HighwayPositionRow = Tables<'highway-position'>;
type SeoulTrafficPositionRow = Tables<'seoul-traffic-position'>;

type WithSource<T, SourceType extends string> = T & { source: SourceType };
type HighwayPositionWithSource = WithSource<HighwayPositionRow, 'highway'>;
type SeoulTrafficPositionWithSource = WithSource<
  SeoulTrafficPositionRow,
  'seoul'
>;

export type MapContainerProps = {
  data: (HighwayPositionWithSource | SeoulTrafficPositionWithSource)[];
};

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: highwayData } = await supabase
    .from('highway-position')
    .select('*')
    .returns<HighwayPositionRow[]>();
  const { data: seoulData } = await supabase
    .from('seoul-traffic-position')
    .select('*')
    .returns<SeoulTrafficPositionRow[]>();

  const { data: incheonData } = await supabase
    .from('incheon-traffic-position')
    .select('*');

  const highway = highwayData?.map((item) => ({
    ...item,
    source: 'highway' as const,
  }));
  const seoul = seoulData?.map((item) => ({
    ...item,
    source: 'seoul' as const,
  }));
  const incheon = incheonData?.map((item) => ({
    ...item,
    source: 'incheon' as const,
  }));

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
