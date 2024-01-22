import { type TrafficHub } from 'app/page';
import { useExternalValue } from 'external-state';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { getGoogleMapStore } from 'store/googleMapStore';

type TrafficMapMarkerProps = {
  traffic: TrafficHub;
};

const TrafficMapMarker = ({ traffic }: TrafficMapMarkerProps) => {
  const googleMapStore = getGoogleMapStore?.();
  const googleMap = useExternalValue(googleMapStore);

  useEffect(() => {
    const latitude = Number(traffic.x_code);
    const longitude = Number(traffic.y_code);
    const id = String(traffic.id);

    const container = document.createElement('div');

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: latitude, lng: longitude },
      map: googleMap,
      title: id,
      content: container,
    });

    createRoot(container).render(
      <div
        style={{
          backgroundColor: 'red',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
        }}
      />,
    );

    markerInstance.addListener('click', () => {
      googleMap.panTo({ lat: latitude, lng: longitude });
    });

    return () => {
      markerInstance.map = null;
    };
  }, []);

  return <></>;
};

export default TrafficMapMarker;
