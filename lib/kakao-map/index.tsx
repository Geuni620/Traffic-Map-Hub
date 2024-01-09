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

import { Badge } from '@/components/ui/badge';

// interface DataItem {
//   XCODE: number | null;
//   YCODE: number | null;
//   source: string;
//   '2022_aadt': number;
// }

export const MapContainer: React.FC<MapContainerProps> = ({ data }) => {
  // const [zoomLevel, setZoomLevel] = useState<number>(10);
  // const [visibleData, setVisibleData] = useState<DataItem[]>([]);

  // const handleBoundsChange = (map: kakao.maps.Map) => {
  //   const bounds: kakao.maps.LatLngBounds = map.getBounds();
  //   const swLatLng: kakao.maps.LatLng = bounds.getSouthWest();
  //   const neLatLng: kakao.maps.LatLng = bounds.getNorthEast();

  //   const filteredData: DataItem[] = data.filter((item) => {
  //     return (
  //       item.XCODE &&
  //       item.YCODE &&
  //       item.XCODE >= swLatLng.getLat() &&
  //       item.XCODE <= neLatLng.getLat() &&
  //       item.YCODE >= swLatLng.getLng() &&
  //       item.YCODE <= neLatLng.getLng()
  //     );
  //   });

  //   setVisibleData(filteredData);
  // };

  // console.log('visible', visibleData);

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
        // onBoundsChanged={(map) => handleBoundsChange(map)}
        // onZoomChanged={(map) => setZoomLevel(map.getLevel())}
      >
        <MarkerClusterer gridSize={300} averageCenter={false} minLevel={8}>
          {data.map((item, index) => {
            if (item.XCODE && item.YCODE) {
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
                    <Badge>{formatNumberWithCommas(item['2022_aadt'])}</Badge>
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
