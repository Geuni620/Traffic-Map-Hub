import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { getGoogleMapStore } from 'store/googleMapStore';

type ClusterMarkerProps = {
  id: number;
  latitude: number;
  longitude: number;
  count: number;
};

const ClusterMarker = ({ traffic }: any) => {
  const mapStore = getGoogleMapStore?.();
  if (!mapStore) return;
  const googleMap = mapStore.getState();
  const { id, latitude, longitude, count } = traffic;

  useEffect(() => {
    const position = new google.maps.LatLng(latitude, longitude);
    const marker = new google.maps.Marker({
      position,
      map: googleMap,
      title: `Cluster ${id}`,
    });

    const container = document.createElement('div');

    console.log('counte', count);

    createRoot(container).render(
      <div className="size-full bg-red-500">{count}</div>,
    );

    const infoWindow = new google.maps.InfoWindow({
      content: container,
    });

    marker.addListener('click', () => {
      infoWindow.open(googleMap, marker);
      googleMap.panTo(position);

      // 현재 줌 레벨을 가져오고, -1하여 새로운 줌 레벨로 설정
      const currentZoomLevel = googleMap.getZoom();
      if (currentZoomLevel !== null && currentZoomLevel > 0) {
        googleMap.setZoom(currentZoomLevel + 1);
      }
    });

    return () => {
      marker.setMap(null);
    };
  }, [id, count, latitude, longitude, googleMap]);

  return null;
};

export default ClusterMarker;
