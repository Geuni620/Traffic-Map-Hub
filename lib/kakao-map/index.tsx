// TODO: 여기서 use client 쓰는게 아니라, 하나씩 아래로 내려주자
'use client';

import { type TrafficHub } from 'app/page';
import { LoadingSpinner } from 'components/common/loading-spinner';
import { LegendCheckboxManager } from 'components/legend/checkbox-manager';
import { LOCATION } from 'constant/location';
import { useCategoryFilter } from 'hooks/useCategoryFilter';
import { useTrafficGetQuery } from 'hooks/useTrafficGetQuery';
import { lazy, Suspense } from 'react';
import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';

const MapMarkerComp = lazy(() => import('components/map/map-marker'));

interface MapContainerProps {
  data: TrafficHub[];
}

export const MapContainer: React.FC<MapContainerProps> = ({ data }) => {
  const { handleCategoryChange, selectedCategory } = useCategoryFilter();
  const { traffic } = useTrafficGetQuery(selectedCategory);

  if (traffic.isLoading) return <LoadingSpinner />;
  return (
    <>
      <LegendCheckboxManager
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
            <Suspense fallback={<LoadingSpinner />}>
              <MapMarkerComp filteredData={traffic.data} />
            </Suspense>
          </MarkerClusterer>
        </Map>
      </LegendCheckboxManager>
    </>
  );
};
