import { useQuery } from '@tanstack/react-query';
import { trafficManagerKeys } from 'lib/query/queryFactory';
import { getGoogleMapStore } from 'store/googleMapStore';
import { getDisplayPosition } from 'utils/getDisplayPosition';

const fetchCluster = async ({ categoryFilter }: UseTrafficGetQueryType) => {
  const mapStore = getGoogleMapStore?.();
  if (!mapStore) return;

  const { latitudeDelta, longitudeDelta, longitude, latitude } =
    getDisplayPosition(mapStore.getState());

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/clusters`);
  url.searchParams.append('latitude', latitude.toString());
  url.searchParams.append('longitude', longitude.toString());
  url.searchParams.append('latitudeDelta', latitudeDelta.toString());
  url.searchParams.append('longitudeDelta', longitudeDelta.toString());
  url.searchParams.append(
    'category',
    Array.from(categoryFilter || []).join(','),
  );

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('마커를 불러오는데 실패했어요..!');
  }

  return await res.json();
};

const fetchTraffic = async ({ categoryFilter }: UseTrafficGetQueryType) => {
  const mapStore = getGoogleMapStore?.();
  if (!mapStore) return;

  const { latitudeDelta, longitudeDelta, longitude, latitude } =
    getDisplayPosition(mapStore.getState());

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/traffic`);
  url.searchParams.append('latitude', latitude.toString());
  url.searchParams.append('longitude', longitude.toString());
  url.searchParams.append('latitudeDelta', latitudeDelta.toString());
  url.searchParams.append('longitudeDelta', longitudeDelta.toString());
  url.searchParams.append(
    'category',
    Array.from(categoryFilter || []).join(','),
  );

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('마커를 불러오는데 실패했어요..!');
  }

  return await res.json();
};

type UseTrafficGetQueryType = {
  categoryFilter?: Set<string>;
  currentZoomLevel?: number;
};

export const useTrafficGetQuery = ({
  categoryFilter,
  currentZoomLevel,
}: UseTrafficGetQueryType) => {
  const queryFunction =
    currentZoomLevel && currentZoomLevel >= 13 ? fetchTraffic : fetchCluster;

  const traffic = useQuery({
    queryKey: [
      ...trafficManagerKeys.traffic,
      'category',
      Array.from(categoryFilter || []).join(','),
      'zoomLevel',
      currentZoomLevel,
    ],
    queryFn: () => queryFunction({ categoryFilter }),
  });

  return {
    traffic,
  };
};
