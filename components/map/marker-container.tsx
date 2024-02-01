import { type TrafficHub } from 'app/page';
import { ClusterMapMarker } from 'components/map/cluster';
import { TrafficMapMarker } from 'components/map/marker';
import { useExternalValue } from 'external-state';
import { useTrafficGetQuery } from 'hooks/useTrafficGetQuery';
import { useEffect, useState } from 'react';
import { getGoogleMapStore } from 'store/googleMapStore';

type MarkerContainerProps = {
  selectedCategory: Set<string>;
};

export type Cluster = {
  id: number;
  latitude: number;
  longitude: number;
  count: number;
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
    return traffic.data?.map((cluster: Cluster) => (
      <ClusterMapMarker key={cluster.id} cluster={cluster} />
    ));
  }

  if (traffic.data === undefined) {
    return null;
  }

  return traffic.data.map((traffic: TrafficHub) => (
    <TrafficMapMarker key={traffic.id} traffic={traffic} />
  ));
};
