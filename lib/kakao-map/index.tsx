'use client';

import { Badge } from 'app/components/ui/badge';
import { type MapContainerProps } from 'app/page';
import { LOCATION } from 'constant/geo-location';
import Script from 'next/script';
import { useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';

export const MapContainer: React.FC<MapContainerProps> = ({ data }) => {
  const [zoomLevel, setZoomLevel] = useState(3);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

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
        level={3}
        onZoomChanged={(map) => setZoomLevel(map.getLevel())}
      >
        {zoomLevel < 10 &&
          data.map((item, index) => {
            if (item.XCODE && item.YCODE) {
              return (
                <CustomOverlayMap
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
                >
                  <Badge>{formatNumber(item['2022_aadt'])}</Badge>
                </CustomOverlayMap>
              );
            }
            return null;
          })}
      </Map>
    </>
  );
};
