import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { getGoogleMapStore } from 'store/googleMapStore';

import { type Cluster } from './marker-container';

type ClusterMarkerProps = {
  cluster: Cluster;
};

const ClusterMarker: React.FC<ClusterMarkerProps> = ({ cluster }) => {
  const mapStore = getGoogleMapStore?.();
  if (!mapStore) return;
  const googleMap = mapStore.getState();
  const { id, latitude, longitude, count } = cluster;

  useEffect(() => {
    const container = document.createElement('div');

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: {
        lat: latitude,
        lng: longitude,
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
      googleMap.panTo({ lat: latitude, lng: longitude });

      const currentZoomLevel = googleMap.getZoom();
      currentZoomLevel && googleMap.setZoom(currentZoomLevel + 1);
    });

    return () => {
      markerInstance.map = null;
    };
  }, []);

  return <></>;
};

export default ClusterMarker;
