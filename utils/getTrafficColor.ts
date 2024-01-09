import { trafficRanges } from 'constant/traffic';

export const getTrafficColor = (
  trafficVolume: number | null,
): string | undefined => {
  if (!trafficVolume) return;

  const matchedRange = trafficRanges.find(
    (range) => trafficVolume < range.limit,
  );

  return matchedRange?.color;
};
