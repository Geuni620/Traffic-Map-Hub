interface MarkerItem {
  label: '고속국도' | '일반국도' | '지방도' | '국가지원지방도';
  image: string;
}

export const MARKER_ITEM: MarkerItem[] = [
  {
    label: '고속국도',
    image: '/images/h-marker-expressway.png',
  },
  {
    label: '일반국도',
    image: '/images/h-marker-national.png',
  },
  {
    label: '지방도',
    image: '/images/h-marker-provincial.png',
  },
  {
    label: '국가지원지방도',
    image: '/images/h-marker-local.png',
  },
];
