import oc from 'open-color';

export const TRAFFIC_RANGE = [
  { limit: 10000, color: oc.green[5] }, // 0 ~ 1만
  { limit: 50000, color: oc.blue[5] }, // 1만 ~ 5만
  { limit: 100000, color: oc.orange[5] }, // 5만 ~ 10만
  { limit: Infinity, color: oc.red[6] }, // 10만 이상
];
