import { REGION_COORDINATES } from '@/constant/location';

type DataItem = {
  [key: string]: string | number | boolean;
  region_city: string;
};

type RegionCoordinate = {
  label: string;
  value: string;
  latitude: number;
  longitude: number;
  count?: number;
};

export const dynamicRegionCounter = (data: DataItem[]) => {
  return data.reduce(
    (acc, item) => {
      const { region_city: region } = item;

      if (region) {
        acc[region] = (acc[region] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );
};

export const updateRegionCounts = (data: DataItem[]): RegionCoordinate[] => {
  const counterResult = dynamicRegionCounter(data);
  return REGION_COORDINATES.map((region) => ({
    ...region,
    count: counterResult[region.label] || 0,
  }));
};
