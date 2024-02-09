import { type TrafficHub } from 'app/page';
import { ClusterMapMarker } from 'components/map/cluster';
import { type Cluster } from 'components/map/cluster';
import { TrafficMapMarker } from 'components/map/marker';
import { RegionMapMarker } from 'components/map/region';
import { type Region } from 'components/map/region';
import {
  SHOW_CLUSTER_ZOOM_LEVEL,
  SHOW_MARKER_ZOOM_LEVEL,
} from 'constant/location';
import { useRegionGetQuery } from 'hooks/useRegionGetQuery';
import { useTrafficGetQuery } from 'hooks/useTrafficGetQuery';

type MarkerContainerProps = {
  selectedCategory: Set<string>;
  currentZoomLevel: number;
};

export const MarkerContainer: React.FC<MarkerContainerProps> = ({
  selectedCategory,
  currentZoomLevel,
}) => {
  const isShowRegion = currentZoomLevel <= SHOW_CLUSTER_ZOOM_LEVEL;
  const isShowCluster =
    currentZoomLevel > SHOW_CLUSTER_ZOOM_LEVEL &&
    currentZoomLevel <= SHOW_MARKER_ZOOM_LEVEL;

  const { data: traffic } = useTrafficGetQuery({
    categoryFilter: selectedCategory,
    currentZoomLevel,
  });

  const { data: region } = useRegionGetQuery({
    categoryFilter: selectedCategory,
    currentZoomLevel,
  });

  // 가장 축소된 레벨에서 region 표시
  if (isShowRegion) {
    return region?.map((region: Region) => (
      <RegionMapMarker key={region.label} region={region} />
    ));
  }

  // 중간 줌 레벨에서 클러스터 표시
  if (isShowCluster) {
    return traffic?.map((cluster: Cluster) => (
      <ClusterMapMarker key={cluster.id} cluster={cluster} />
    ));
  }

  // 가장 확대된 레벨에서 개별 마커(traffic) 표시
  return traffic?.map((traffic: TrafficHub) => (
    <TrafficMapMarker key={traffic.id} traffic={traffic} />
  ));
};
