import { type TrafficHub } from 'app/page';
import { ClusterMapMarker } from 'components/map/cluster';
import { TrafficMapMarker } from 'components/map/marker';
import { useExternalValue } from 'external-state';
import { useTrafficGetQuery } from 'hooks/useTrafficGetQuery';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { getGoogleMapStore } from 'store/googleMapStore';

import { LoadingSpinner } from '../common/loading-spinner';

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

    const debouncedSetZoomLevel = debounce(() => {
      setCurrentZoomLevel(googleMaps.getZoom());
    }, 200);

    const listener = googleMaps.addListener(
      'zoom_changed',
      debouncedSetZoomLevel,
    );

    return () => {
      google.maps.event.removeListener(listener);
      debouncedSetZoomLevel.cancel();
    };
  }, [googleMaps]);

  const { data: traffic, isLoading } = useTrafficGetQuery({
    categoryFilter: selectedCategory,
    currentZoomLevel,
  });

  if (isLoading) {
    return (
      <div className="centered-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (currentZoomLevel && currentZoomLevel <= 13) {
    return traffic?.map((cluster: Cluster) => (
      <ClusterMapMarker key={cluster.id} cluster={cluster} />
    ));
  }

  return traffic?.map((traffic: TrafficHub) => (
    <TrafficMapMarker key={traffic.id} traffic={traffic} />
  ));
};
