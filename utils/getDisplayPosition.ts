export type DisplayPosition = {
  longitude: number;
  latitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
  zoom: number;
};

export const getDisplayPosition = (map: kakao.maps.Map): DisplayPosition => {
  const center = map.getCenter();
  const bounds = map.getBounds();
  const ne = bounds.getNorthEast(); // 북동쪽 좌표
  const sw = bounds.getSouthWest(); // 남서쪽 좌표

  const longitudeDelta = (ne.getLng() - sw.getLng()) / 2;
  const latitudeDelta = (ne.getLat() - sw.getLat()) / 2;
  const zoom = map.getLevel();

  return {
    longitude: center.getLng(),
    latitude: center.getLat(),
    longitudeDelta,
    latitudeDelta,
    zoom,
  };
};
