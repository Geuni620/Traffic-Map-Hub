import { MapContainer } from 'lib/kakao-map';
import { cookies } from 'next/headers';

import { createClient } from '@/utils/supabase/server';

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: highway } = await supabase.from('highway-position').select('*');
  const { data: seoul } = await supabase
    .from('seoul-traffic-position')
    .select('*');
  const combinedData = [...highway, ...seoul];

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <MapContainer data={combinedData} />
    </div>
  );
}
