import { MapContainer } from 'lib/kakao-map';
import { cookies } from 'next/headers';

import { createClient } from '@/utils/supabase/server';

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: position } = await supabase.from('position').select('*');

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <MapContainer data={position} />
    </div>
  );
}
