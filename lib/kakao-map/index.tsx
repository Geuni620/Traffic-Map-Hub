'use client';

import { type MapContainerProps } from 'app/page';
import { LoadingSpinner } from 'components/common/LoadingSpinner';
import { LegendCheckboxManager } from 'components/legend/checkbox-manager';
import { LOCATION } from 'constant/location';
import { lazy, Suspense } from 'react';
import { useState } from 'react';
import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';

const MapMarkerComp = lazy(() => import('components/map/map-marker'));

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
      {/* <div className="legend-group">
        <CheckboxWithLabel id="traffic-filter" label="통계연보" />
        <CheckboxWithLabel id="traffic-filter" label="서울시" />
        <CheckboxWithLabel id="traffic-filter" label="인천시" />
        <CheckboxWithLabel id="traffic-filter" label="도로업무편람('21)" />
      </div> */}
      <LegendCheckboxManager>
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
            <Suspense fallback={<LoadingSpinner />}>
              <MapMarkerComp filteredData={filteredData} />
            </Suspense>
          </MarkerClusterer>
        </Map>
      </LegendCheckboxManager>
    </>
  );
};
