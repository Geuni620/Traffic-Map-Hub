import { LoadingSpinner } from 'components/common/loading-spinner';
import { Badge } from 'components/ui/badge';
import { type CategoryFilter } from 'constant/legend';
import { useTrafficGetQuery } from 'hooks/useTrafficGetQuery';
import { Fragment } from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import { formatNumberWithCommas } from 'utils/formatNumberWithCommas';
import { formatType } from 'utils/formatType';
import { getMarkerImage } from 'utils/getMarkerImage';
import { getTrafficColor } from 'utils/getTrafficColor';

interface MapMarkerProps {
  selectedCategory: Set<CategoryFilter>;
  zoomLevel: number;
}

export const MapMarkerComp: React.FC<MapMarkerProps> = ({
  selectedCategory,
  zoomLevel,
}) => {
  const SHOW_MARKER_LEVEL = 6;
  const { traffic } = useTrafficGetQuery(selectedCategory);

  if (traffic.data) {
    traffic.data.map((item, index) => {
      if (item.x_code && item.y_code && zoomLevel <= SHOW_MARKER_LEVEL) {
        const aadtKey = item.source === 'toll' ? 'aadt_2021' : 'aadt_2022';
        const badgeColor = getTrafficColor(item?.[aadtKey]);
        const markerImageSrc = getMarkerImage(item.source, item.road_type);

        return (
          <Fragment key={index}>
            <MapMarker
              position={{
                lat: item.x_code,
                lng: item.y_code,
              }}
              image={{
                src: markerImageSrc,
                size: {
                  width: 25,
                  height: 25,
                },
              }}
            />
            <CustomOverlayMap
              position={{
                lat: item.x_code,
                lng: item.y_code,
              }}
              xAnchor={0.5}
              yAnchor={2.0}
            >
              <Badge
                className="p-0"
                style={{
                  backgroundColor: badgeColor,
                }}
              >
                <p className="badge-label">
                  {formatType(item.traffic_survey_type).label}{' '}
                  {formatNumberWithCommas(item[aadtKey])}
                </p>
              </Badge>
            </CustomOverlayMap>
          </Fragment>
        );
      }
    });
  }

  return <LoadingSpinner />;
};
