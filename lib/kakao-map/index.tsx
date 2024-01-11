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

export type CategoryFilter = 'all' | 'highway' | 'seoul' | 'incheon';
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
      <RadioButtonHandler
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      >
        <Map
          center={{ lat: LOCATION.LATITUDE, lng: LOCATION.LONGITUDE }}
          style={{ width: '100%', height: '100vh' }}
          level={12}
        >
          <MarkerClusterer gridSize={300} averageCenter={false} minLevel={8}>
            {filteredData.map((item, index: number) => {
              if (item.XCODE && item.YCODE) {
                const badgeColor = getTrafficColor(item['2022_aadt']);
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
                          width: 40,
                          height: 40,
                        },
                      }}
                    />
                    <CustomOverlayMap
                      position={{
                        lat: item.XCODE as number,
                        lng: item.YCODE as number,
                      }}
                      xAnchor={0.5}
                      yAnchor={2.2}
                    >
                      <Badge
                        className="p-0"
                        style={{
                          backgroundColor: badgeColor,
                        }}
                      >
                        <p
                          className="badge-type"
                          style={{
                            color: formatType(item?.type).color,
                          }}
                        >
                          {formatType(item.type).label}
                        </p>
                        <p className="badge-label">
                          {formatNumberWithCommas(item['2022_aadt'])}
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
    </>
  );
};
