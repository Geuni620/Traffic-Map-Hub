import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { getGoogleMapStore } from 'store/googleMapStore';

import { type Cluster } from './marker-container';

type ClusterMapMarker = {
  cluster: Cluster;
};

export const ClusterMapMarker: React.FC<ClusterMapMarker> = ({ cluster }) => {
  const mapStore = getGoogleMapStore?.();
  if (!mapStore) return;
  const googleMap = mapStore.getState();
  const { id, latitude, longitude, count } = cluster;

  const lat = Number(latitude) || 0;
  const lng = Number(longitude) || 0;

  useEffect(() => {
    const container = document.createElement('div');
    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: {
        lat,
        lng,
      },
      map: googleMap,
      title: `Cluster ${id}`,
      content: container,
    });

    createRoot(container).render(
      <div className="animate-fade-in flex size-16 items-center justify-center rounded-full border border-blue-600 bg-blue-200 p-4 text-lg font-bold">
        <span>{count}</span>
      </div>,
    );

    markerInstance.addListener('click', () => {
      googleMap.panTo({ lat, lng });

      const currentZoomLevel = googleMap.getZoom();
      if (currentZoomLevel) {
        googleMap.setZoom(currentZoomLevel + 1);
      }
    });

    return () => {
      markerInstance.map = null;
    };
  }, [googleMap, id, lat, lng, count]);

  return <></>;
};
