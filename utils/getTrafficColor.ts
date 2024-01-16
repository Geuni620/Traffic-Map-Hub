import { TRAFFIC_RANGE } from 'constant/traffic';

export const getTrafficColor = (trafficVolume: number): string | undefined => {
  if (!trafficVolume) return;

  console.log('trafficVolume', trafficVolume);

  const matchedRange = TRAFFIC_RANGE.find(
    (range) => trafficVolume < range.limit,
  );

  return matchedRange?.color;
};
