import { useQuery } from '@tanstack/react-query';
import { getGoogleMapStore } from 'store/googleMapStore';
import { getDisplayPosition } from 'utils/getDisplayPosition';

import { trafficManagerKeys } from '@/lib/query/queryFactory';

const fetchTraffic = async () => {
  const googleMap = getGoogleMapStore().getState();
  const { latitudeDelta, longitudeDelta, longitude, latitude } =
    getDisplayPosition(googleMap);

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/traffic`);
  url.searchParams.append('latitude', latitude.toString());
  url.searchParams.append('longitude', longitude.toString());
  url.searchParams.append('latitudeDelta', latitudeDelta.toString());
  url.searchParams.append('longitudeDelta', longitudeDelta.toString());

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('마커를 불러오는데 실패했어요..!');
  }

  return await res.json();
};

export const useTrafficGetQuery = () => {
  const traffic = useQuery({
    queryKey: [...trafficManagerKeys.traffic],
    queryFn: fetchTraffic,
    refetchOnWindowFocus: false,
  });

  return {
    traffic,
  };
};
