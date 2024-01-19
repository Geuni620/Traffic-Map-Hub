export const trafficManagerKeys = {
  traffic: ['traffic'] as const,
  getTraffic: (category: string) =>
    [...trafficManagerKeys.traffic, category] as const,
};
