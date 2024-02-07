import { useQuery } from '@tanstack/react-query';
import { SHOW_MARKER_ZOOM_LEVEL } from 'constant/location';
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
  // 필터가 없으면 무조건 false
  const enabled = !!categoryFilter && categoryFilter.size > 0;
  const queryFunction =
    currentZoomLevel && currentZoomLevel >= SHOW_MARKER_ZOOM_LEVEL
      ? fetchTraffic
      : fetchCluster;

  return useQuery({
    queryKey: [
      ...trafficManagerKeys.traffic,
      'category',
      Array.from(categoryFilter || []).join(','),
      'zoomLevel',
      currentZoomLevel,
    ],
    queryFn: () => queryFunction({ categoryFilter }),
    enabled,
  });
};
