'use client';

import { LOCATION } from 'constant/geo-location';
import Script from 'next/script';
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

type MapContainerProps = {
  data: any;
};

export const MapContainer: React.FC<MapContainerProps> = ({ data }) => {
  const [zoomLevel, setZoomLevel] = useState(3);

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
          data.map((item, index) => (
            <MapMarker
              key={index}
              position={{ lat: item.XCODE, lng: item.YCODE }}
              image={{
                src:
                  item.source === 'highway'
                    ? '/images/h-maker.png'
                    : '/images/s-maker.png',
                size: {
                  width: 25,
                  height: 25,
                },
              }}
            >
              {/* 마커 클릭 시 표시될 내용 */}
            </MapMarker>
          ))}
      </Map>
    </>
  );
};
