'use client';

import { type MapContainerProps } from 'app/page';
import { LOCATION } from 'constant/geo-location';
import Script from 'next/script';
import { Fragment } from 'react';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer,
} from 'react-kakao-maps-sdk';
import { formatNumberWithCommas } from 'utils/formatNumberWithCommas';
import { getTrafficColor } from 'utils/getTrafficColor';

import { Badge } from '@/components/ui/badge';

export const MapContainer: React.FC<MapContainerProps> = ({ data }) => {
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
      >
        <MarkerClusterer gridSize={300} averageCenter={false} minLevel={8}>
          {data.map((item, index) => {
            if (item.XCODE && item.YCODE) {
              const badgeColor = getTrafficColor(item['2022_aadt']);

              return (
                <Fragment key={index}>
                  <MapMarker
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
                    <Badge style={{ backgroundColor: badgeColor }}>
                      {formatNumberWithCommas(item['2022_aadt'])}
                    </Badge>
                  </CustomOverlayMap>
                </Fragment>
              );
            }
            return null;
          })}
        </MarkerClusterer>
      </Map>
    </>
  );
};
