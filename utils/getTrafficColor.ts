import { TRAFFIC_RANGE } from 'constant/traffic';

export const getTrafficColor = (
  trafficVolume: number | null,
): string | undefined => {
  if (!trafficVolume) return;

  const matchedRange = TRAFFIC_RANGE.find(
    (range) => trafficVolume < range.limit,
  );

  return matchedRange?.color;
};
