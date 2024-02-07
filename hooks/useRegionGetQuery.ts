import { useQuery } from '@tanstack/react-query';
import { trafficManagerKeys } from 'lib/query/queryFactory';

const fetchRegion = async ({
  categoryFilter,
}: Pick<UseRegionGetQueryType, 'categoryFilter'>) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/region`);
  url.searchParams.append(
    'category',
    Array.from(categoryFilter || []).join(','),
  );

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('지역 전체정보를 불러오는데 실패했어요..!');
  }

  return await res.json();
};

type UseRegionGetQueryType = {
  categoryFilter?: Set<string>;
  currentZoomLevel?: number;
};

export const useRegionGetQuery = ({
  categoryFilter,
  currentZoomLevel,
}: UseRegionGetQueryType) => {
  const enabled = !!categoryFilter && categoryFilter.size > 0;

  return useQuery({
    queryKey: [
      ...trafficManagerKeys.traffic,
      'category',
      Array.from(categoryFilter || []).join(','),
      'zoomLevel',
      currentZoomLevel,
      'region',
    ],
    queryFn: () => fetchRegion({ categoryFilter }),
    enabled,
  });
};
