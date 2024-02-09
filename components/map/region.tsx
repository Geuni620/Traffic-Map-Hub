import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { getGoogleMapStore } from 'store/googleMapStore';

export type Region = {
  id: number;
  label: string;
  latitude: number;
  longitude: number;
  count: number;
};

type RegionMapMarker = {
  region: Region;
};

export const RegionMapMarker: React.FC<RegionMapMarker> = ({ region }) => {
  const mapStore = getGoogleMapStore?.();
  if (!mapStore) return;
  const googleMap = mapStore.getState();
  const { id, label, latitude, longitude, count } = region;

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
      title: `Region ${id}`,
      content: container,
    });

    createRoot(container).render(
      <div className="animate-fade-in flex h-8 flex-wrap items-center justify-center rounded-md border border-blue-600 bg-blue-200 px-1 text-base font-bold">
        <div className="flex size-6 items-center justify-center rounded-sm bg-white px-2 py-0.5 text-sm">
          {count}
        </div>
        <div className="ml-1 text-sm">{label}</div>
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
  }, [googleMap, lat, lng, label, count, id]);

  return <></>;
};
