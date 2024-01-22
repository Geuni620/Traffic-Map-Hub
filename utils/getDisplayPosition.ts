type DisplayPosition = {
  longitude: number;
  latitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
  zoom: number;
};

export const getDisplayPosition = (map: google.maps.Map): DisplayPosition => {
  const center = map.getCenter();
  const bounds = map.getBounds();

  const longitudeDelta = bounds
    ? (bounds.getNorthEast().lng() - bounds.getSouthWest().lng()) / 2
    : 0;
  const latitudeDelta = bounds
    ? (bounds.getNorthEast().lat() - bounds.getSouthWest().lat()) / 2
    : 0;
  const longitude = center ? center.lng() : 0;
  const latitude = center ? center.lat() : 0;
  const zoom = map.getZoom() || 0;

  return {
    longitude,
    latitude,
    longitudeDelta: longitudeDelta,
    latitudeDelta: latitudeDelta,
    zoom,
  };
};
