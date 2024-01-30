import { type TrafficHub } from 'app/page';
import { useExternalValue } from 'external-state';
import { useTrafficGetQuery } from 'hooks/useTrafficGetQuery';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { getGoogleMapStore } from 'store/googleMapStore';

const TrafficMapMarker = dynamic(() => import('@/components/map/marker'), {
  ssr: false,
});

const ClusterMapMarker = dynamic(() => import('@/components/map/cluster'), {
  ssr: false,
});

type MarkerContainerProps = {
  selectedCategory: Set<string>;
};

export const MarkerContainer: React.FC<MarkerContainerProps> = ({
  selectedCategory,
}) => {
  const mapStore = getGoogleMapStore?.();
  if (!mapStore) return;
  const googleMaps = useExternalValue(mapStore);
  const [currentZoomLevel, setCurrentZoomLevel] = useState(
    googleMaps?.getZoom(),
  );

  useEffect(() => {
    if (!googleMaps) return;

    const onZoomChanged = () => {
      setCurrentZoomLevel(googleMaps.getZoom());
    };

    const listener = googleMaps.addListener('zoom_changed', onZoomChanged);

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [googleMaps]);

  const { traffic } = useTrafficGetQuery({
    categoryFilter: selectedCategory,
    currentZoomLevel,
  });

  if (currentZoomLevel && currentZoomLevel <= 13) {
    return (
      <>
        {traffic.data?.map((traffic: TrafficHub) => {
          return <ClusterMapMarker key={traffic.id} traffic={traffic} />;
        })}
      </>
    );
  }

  if (traffic.data === undefined) {
    return null;
  }

  return traffic.data.map((traffic: TrafficHub) => (
    <TrafficMapMarker key={traffic.id} traffic={traffic} />
  ));
};
