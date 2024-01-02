'use client';

import Script from 'next/script';
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

type MapContainerProps = {
  data: any;
};

export const MapContainer: React.FC<MapContainerProps> = ({ data }) => {
  const [zoomLevel, setZoomLevel] = useState(3);
  console.log('zoomLevel', zoomLevel);
  console.log('data', data);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      />

      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '100%', height: '100vh' }}
        level={3}
        onZoomChanged={(map) => setZoomLevel(map.getLevel())}
      >
        {zoomLevel < 10 &&
          data.map((item, index) => (
            <MapMarker
              key={index}
              position={{ lat: item.XCODE, lng: item.YCODE }}
            >
              {/* 마커 클릭 시 표시될 내용 */}
            </MapMarker>
          ))}
      </Map>
    </>
  );
};
