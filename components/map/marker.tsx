import { type TrafficHub } from 'app/page';
import { Badge } from 'components/ui/badge';
import { useExternalValue } from 'external-state';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { getGoogleMapStore } from 'store/googleMapStore';
import { formatNumberWithCommas } from 'utils/formatNumberWithCommas';
import { formatType } from 'utils/formatType';
import { getMarkerImage } from 'utils/getMarkerImage';
import { getTrafficColor } from 'utils/getTrafficColor';

type TrafficMapMarkerProps = {
  traffic: TrafficHub;
};

const TrafficMapMarker = ({ traffic }: TrafficMapMarkerProps) => {
  const mapStore = getGoogleMapStore?.();
  if (!mapStore) return;
  const googleMap = useExternalValue(mapStore);

  useEffect(() => {
    const latitude = Number(traffic.x_code);
    const longitude = Number(traffic.y_code);
    const id = String(traffic.id);
    const source = traffic.source;
    const roadType = traffic.road_type;
    const aadtKey = source === 'toll' ? 'aadt_2021' : 'aadt_2022';
    const trafficVolume = traffic?.[aadtKey];
    const marker = getMarkerImage(source, roadType);
    const badgeColor = getTrafficColor(traffic?.[aadtKey]);
    const container = document.createElement('div');
    container.className = 'marker-container';

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: latitude, lng: longitude },
      map: googleMap,
      title: id,
      content: container,
    });

    createRoot(container).render(
      <>
        <Badge
          className="badge-label p-0"
          style={{
            backgroundColor: badgeColor,
          }}
        >
          <p>
            {formatType(traffic.traffic_survey_type).label}{' '}
            {formatNumberWithCommas(trafficVolume)}
          </p>
        </Badge>
        <img src={marker} className="size-7" alt="marker" />
      </>,
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
