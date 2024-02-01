import { type TrafficHub } from 'app/page';
import { ClusterMapMarker } from 'components/map/cluster';
import { TrafficMapMarker } from 'components/map/marker';
import { useTrafficGetQuery } from 'hooks/useTrafficGetQuery';

type MarkerContainerProps = {
  selectedCategory: Set<string>;
  currentZoomLevel: number;
};

export type Cluster = {
  id: number;
  latitude: number;
  longitude: number;
  count: number;
};

export const MarkerContainer: React.FC<MarkerContainerProps> = ({
  selectedCategory,
  currentZoomLevel,
}) => {
  const { data: traffic } = useTrafficGetQuery({
    categoryFilter: selectedCategory,
    currentZoomLevel,
  });

  if (currentZoomLevel && currentZoomLevel <= 13) {
    return traffic?.map((cluster: Cluster) => (
      <ClusterMapMarker key={cluster.id} cluster={cluster} />
    ));
  }

  return traffic?.map((traffic: TrafficHub) => (
    <TrafficMapMarker key={traffic.id} traffic={traffic} />
  ));
};
