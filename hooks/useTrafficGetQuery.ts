import { useQuery } from '@tanstack/react-query';
import { type TrafficHub } from 'app/page';
import { type CategoryFilter } from 'constant/legend';
import { trafficManagerKeys } from 'lib/query/queryFactory';
import { DisplayPosition } from 'utils/getDisplayPosition';

interface GetTrafficParams {
  mapDisplayPosition: DisplayPosition;
  categoryFilterArray?: CategoryFilter[];
}

const getTraffic = async ({
  categoryFilterArray,
  mapDisplayPosition,
}: GetTrafficParams) => {
  const { latitudeDelta, longitudeDelta, longitude, latitude } =
    mapDisplayPosition;

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/traffic`);
  categoryFilterArray?.forEach((filter) =>
    url.searchParams.append('category', filter),
  );
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

type UseTrafficGetQueryType = {
  mapDisplayPosition: DisplayPosition;
  categoryFilter?: Set<CategoryFilter>;
};

export const useTrafficGetQuery = ({
  mapDisplayPosition,
  categoryFilter,
}: UseTrafficGetQueryType) => {
  const positionKey = `${mapDisplayPosition.latitude},${mapDisplayPosition.longitude},${mapDisplayPosition.zoom}`;

  const categoryFilterArray = Array.from(categoryFilter || []);

  const traffic = useQuery<TrafficHub[]>({
    queryKey: [
      ...trafficManagerKeys.traffic,
      positionKey,
      ...categoryFilterArray,
    ],
    queryFn: () => getTraffic({ categoryFilterArray, mapDisplayPosition }),
    enabled: mapDisplayPosition.zoom < 8,
  });

  return { traffic };
};
