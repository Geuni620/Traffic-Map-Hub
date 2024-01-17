'use client';

import { type MapContainerProps } from 'app/page';
import { RadioButtonHandler } from 'components/common/radio-wrapper';
import { LOCATION } from 'constant/geo-location';
import { lazy, Suspense } from 'react';
import { useState } from 'react';
import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import { BeatLoader } from 'react-spinners';

import { LegendViewWrapper } from '@/components/common/legend-wrapper';

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
              <Suspense
                fallback={
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <BeatLoader color="#36d7b7" />
                  </div>
                }
              >
                <MapMarkerComp filteredData={filteredData} />
              </Suspense>
            </MarkerClusterer>
          </Map>
        </RadioButtonHandler>
      </LegendViewWrapper>
    </>
  );
};
