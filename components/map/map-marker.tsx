import { TrafficPositionWithSource } from 'app/page';
import { Badge } from 'components/ui/badge';
import { Fragment } from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import { formatNumberWithCommas } from 'utils/formatNumberWithCommas';
import { formatType } from 'utils/formatType';
import { getMarkerImage } from 'utils/getMarkerImage';
import { getTrafficColor } from 'utils/getTrafficColor';

interface MapMarkerProps {
  filteredData: TrafficPositionWithSource[];
}

const MapMarkerComp: React.FC<MapMarkerProps> = ({ filteredData }) => {
  return (
    <>
      {filteredData.map((item, index) => {
        if (item.XCODE && item.YCODE) {
          const aadtKey = item.source === 'toll' ? '2021_aadt' : '2022_aadt';
          const badgeColor = getTrafficColor(item[aadtKey]);
          const markerImageSrc = getMarkerImage(item.source, item.road_type);

          return (
            <Fragment key={index}>
              <MapMarker
                position={{
                  lat: item.XCODE,
                  lng: item.YCODE,
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
                  lat: item.XCODE,
                  lng: item.YCODE,
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
                    {formatType(item.type).label}{' '}
                    {formatNumberWithCommas(item[aadtKey])}
                  </p>
                </Badge>
              </CustomOverlayMap>
            </Fragment>
          );
        }
        return null;
      })}
    </>
  );
};

export default MapMarkerComp;
