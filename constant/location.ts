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

export const INITIAL_ZOOM_LEVEL = 8;
export const MIN_ZOOM_LEVEL = 8;
export const MAX_ZOOM_LEVEL = 20;
export const SHOW_MARKER_ZOOM_LEVEL = 12.5;
export const SHOW_CLUSTER_ZOOM_LEVEL = 10;
export const REGION_COORDINATES = [
  {
    label: '서울',
    value: 'seoul',
    latitude: 37.5665,
    longitude: 126.978,
  },
  {
    label: '인천',
    value: 'incheon',
    latitude: 37.4563,
    longitude: 126.7052,
  },
  {
    label: '대전',
    value: 'daejeon',
    latitude: 36.3504,
    longitude: 127.3845,
  },
  {
    label: '충남',
    value: 'chungnam',
    latitude: 36.6588,
    longitude: 126.6728,
  },
  {
    label: '전북',
    value: 'jeonbuk',
    latitude: 35.7175,
    longitude: 127.153,
  },
  {
    label: '전남',
    value: 'jeonnam',
    latitude: 34.8679,
    longitude: 126.991,
  },
  {
    label: '광주',
    value: 'gwangju',
    latitude: 35.1595,
    longitude: 126.8526,
  },
  {
    label: '경기',
    value: 'gyeonggi',
    latitude: 37.4138,
    longitude: 127.5183,
  },
  {
    label: '강원',
    value: 'gangwon',
    latitude: 37.8854,
    longitude: 127.7298,
  },
  {
    label: '경남',
    value: 'gyeongnam',
    latitude: 35.4606,
    longitude: 128.2132,
  },
  {
    label: '부산',
    value: 'busan',
    latitude: 35.1796,
    longitude: 129.0756,
  },
  {
    label: '대구',
    value: 'daegu',
    latitude: 35.8714,
    longitude: 128.6014,
  },
  {
    label: '울산',
    value: 'ulsan',
    latitude: 35.5384,
    longitude: 129.3114,
  },
  {
    label: '경북',
    value: 'gyeongbuk',
    latitude: 36.4919,
    longitude: 128.8889,
  },
  {
    label: '충북',
    value: 'chungbuk',
    latitude: 36.8,
    longitude: 127.7,
  },
  {
    label: '세종',
    value: 'sejong',
    latitude: 36.48,
    longitude: 127.289,
  },
  {
    label: '제주',
    value: 'jeju',
    latitude: 33.489,
    longitude: 126.4983,
  },
];
