import { type TrafficHub } from 'app/page';
import { useTrafficGetQuery } from 'hooks/useTrafficGetQuery';
import dynamic from 'next/dynamic';

const TrafficMapMarker = dynamic(() => import('@/components/map/marker'), {
  ssr: false,
});

export const MarkerContainer: React.FC = () => {
  const { traffic } = useTrafficGetQuery();

  if (traffic.data === undefined) {
    return null;
  }

  return traffic.data.map((traffic: TrafficHub) => (
    <TrafficMapMarker key={traffic.id} traffic={traffic} />
  ));
};
