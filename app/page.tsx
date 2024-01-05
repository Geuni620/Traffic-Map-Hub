import { MapContainer } from 'lib/kakao-map';
import { cookies } from 'next/headers';
import { Tables } from 'types/supabase';

import { createClient } from '@/utils/supabase/server';

// 'highway-position' 테이블의 행 타입
type HighwayPositionRow = Tables<'highway-position'>;

// 'seoul-traffic-position' 테이블의 행 타입
type SeoulTrafficPositionRow = Tables<'seoul-traffic-position'>;

// MapContainer 컴포넌트의 props 타입
export type MapContainerProps = {
  data:
    | (HighwayPositionRow & { source: 'highway' })[]
    | (SeoulTrafficPositionRow & { source: 'seoul' })[];
};

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: highwayData } = await supabase
    .from('highway-position')
    .select('*');
  const { data: seoulData } = await supabase
    .from('seoul-traffic-position')
    .select('*');

  const highway = highwayData?.map((item) => ({ ...item, source: 'highway' }));
  const seoul = seoulData?.map((item) => ({ ...item, source: 'seoul' }));
  const combinedData = [...highway, ...seoul];

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <MapContainer data={combinedData} />
    </div>
  );
}
