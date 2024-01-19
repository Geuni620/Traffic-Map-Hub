import { useQuery } from '@tanstack/react-query';
import { type CategoryFilter } from 'constant/legend';
import { trafficManagerKeys } from 'lib/query/queryFactory';

interface GetTrafficParams {
  categoryFilterArray?: CategoryFilter[];
}

const getTraffic = async ({ categoryFilterArray }: GetTrafficParams) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/traffic`);
  categoryFilterArray?.forEach((filter) =>
    url.searchParams.append('category', filter),
  );
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('기록이 정보를 저장하는데 실패했어요!!!');
  }

  return await res.json();
};

export const useTrafficGetQuery = (categoryFilter?: Set<CategoryFilter>) => {
  const categoryFilterArray = Array.from(categoryFilter || []);
  console.log('category', categoryFilter);
  console.log('categoryFilterArray', categoryFilterArray);

  const traffic = useQuery({
    queryKey: [trafficManagerKeys.traffic, ...categoryFilterArray],
    queryFn: () => getTraffic({ categoryFilterArray }),
  });

  return { traffic };
};
