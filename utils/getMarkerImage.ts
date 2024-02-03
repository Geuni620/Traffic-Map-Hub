export const getMarkerImage = (
  source: string | null,
  roadType: string | null,
): string => {
  switch (source) {
    case 'highway':
      switch (roadType) {
        case 'expressway':
          return '/images/h-marker-expressway.png';
        case 'national':
          return '/images/h-marker-national.png';
        case 'provincial':
          return '/images/h-marker-provincial.png';
        case 'local':
          return '/images/h-marker-local.png';
        default:
          return '/images/default-marker.png';
      }

    case 'seoul':
      return '/images/s-marker.png';
    case 'incheon':
      return '/images/i-marker.png';
    case 'toll':
      return '/images/t-marker.png';
    case 'busan':
      return '/images/b-marker.png';
    case 'daegu':
      return '/images/dg-marker.png';
    case 'daejeon':
      return '/images/dj-marker.png';

    default:
      return '/images/default-marker.png';
  }
};
