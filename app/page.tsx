'use client';

// import { MapContainer } from 'lib/kakao-map';
import { MapContainer } from 'components/map/map-container';
import { useEffect, useState } from 'react';
import { Tables } from 'types/supabase';

export type TrafficHub = Tables<'traffic_hub'>;

export default function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && <MapContainer />;
}
