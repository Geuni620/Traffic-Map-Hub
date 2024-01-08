'use client';

import { Badge } from 'app/components/ui/badge';
import { type MapContainerProps } from 'app/page';
import { LOCATION } from 'constant/geo-location';
import Script from 'next/script';
import { useState } from 'react';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer,
} from 'react-kakao-maps-sdk';
import { formatNumberWithCommas } from 'utils/formatNumberWithCommas';

export const MapContainer: React.FC<MapContainerProps> = ({ data }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(10);

  console.log(zoomLevel);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      />
      <Map
        center={{ lat: LOCATION.LATITUDE, lng: LOCATION.LONGITUDE }}
        style={{ width: '100%', height: '100vh' }}
        level={12}
        onZoomChanged={(map) => setZoomLevel(map.getLevel())}
      >
        <MarkerClusterer averageCenter={false} minLevel={8}>
          {data.map((item, index) => {
            if (item.XCODE && item.YCODE) {
              return (
                <>
                  <MapMarker
                    key={index}
                    position={{
                      lat: item.XCODE as number,
                      lng: item.YCODE as number,
                    }}
                    image={{
                      src:
                        item.source === 'highway'
                          ? '/images/h-marker.png'
                          : item.source === 'seoul'
                            ? '/images/s-marker.png'
                            : '/images/i-marker.png',
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
                    yAnchor={2.3}
                  >
                    <Badge>{formatNumberWithCommas(item['2022_aadt'])}</Badge>
                  </CustomOverlayMap>
                </>
              );
            }

            return null;
          })}
        </MarkerClusterer>
      </Map>
    </>
  );
};
