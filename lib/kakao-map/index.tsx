'use client';

import { type MapContainerProps } from 'app/page';
import { RadioButtonHandler } from 'components/common/radio-wrapper';
import { Badge } from 'components/ui/badge';
import { LOCATION } from 'constant/geo-location';
import { Fragment, useState } from 'react';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer,
} from 'react-kakao-maps-sdk';
import { formatNumberWithCommas } from 'utils/formatNumberWithCommas';
import { formatType } from 'utils/formatType';
import { getMarkerImage } from 'utils/getMarkerImage';
import { getTrafficColor } from 'utils/getTrafficColor';

import { LegendViewWrapper } from '@/components/common/legend-wrapper';

export type CategoryFilter = 'all' | 'highway' | 'seoul' | 'incheon' | 'toll';
export type RoadType = 'expressway' | 'national' | 'provincial' | 'local';

export const MapContainer: React.FC<MapContainerProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (value: CategoryFilter) => {
    setSelectedCategory(value);
  };

  const filteredData = data.filter(
    (item) => selectedCategory === 'all' || item.source === selectedCategory,
  );

  return (
    <>
      <LegendViewWrapper>
        <RadioButtonHandler
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        >
          <Map
            center={{ lat: LOCATION.LATITUDE, lng: LOCATION.LONGITUDE }}
            style={{ width: '100%', height: '100vh' }}
            level={12}
            maxLevel={12}
          >
            <MarkerClusterer
              texts={(size) => {
                /**
                 * MapMarker와 CustomOverlayMap을 같이 사용할 경우
                 * 둘이 합쳐진 수치가 렌더링 됨
                 */
                return (size / 2).toString();
              }}
              gridSize={300}
              averageCenter={true}
              minLevel={8}
            >
              {filteredData.map((item, index: number) => {
                if (item.XCODE && item.YCODE) {
                  const aadtKey =
                    item.source === 'toll' ? '2021_aadt' : '2022_aadt';
                  const badgeColor = getTrafficColor(item[aadtKey]);
                  const markerImageSrc = getMarkerImage(
                    item.source,
                    item.road_type,
                  );

                  return (
                    <Fragment key={index}>
                      <MapMarker
                        position={{
                          lat: item.XCODE as number,
                          lng: item.YCODE as number,
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
                          lat: item.XCODE as number,
                          lng: item.YCODE as number,
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
            </MarkerClusterer>
          </Map>
        </RadioButtonHandler>
      </LegendViewWrapper>
    </>
  );
};
