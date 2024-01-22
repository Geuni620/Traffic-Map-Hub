interface Location {
  LATITUDE: number;
  LONGITUDE: number;
}

export const LOCATION: Location = {
  // 사당역 기준으로 잡음
  LATITUDE: 37.476,
  LONGITUDE: 126.981,
};

interface Region {
  label: string;
  value: string;
}

export const REGION: Region[] = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '전국',
    value: 'highway',
  },
  {
    label: '서울',
    value: 'seoul',
  },
  {
    label: '인천',
    value: 'incheon',
  },
  {
    label: '유료',
    value: 'toll',
  },
];

export const SHOW_MARKER_ZOOM_LEVEL = 7;
