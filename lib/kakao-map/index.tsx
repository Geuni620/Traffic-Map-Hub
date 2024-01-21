// TODO: 여기서 use client 쓰는게 아니라, 하나씩 아래로 내려주자
'use client';

import { useQueryClient } from '@tanstack/react-query';
import { LegendCheckboxManager } from 'components/legend/checkbox-manager';
import { MapMarkerComp } from 'components/map/map-marker';
import { LOCATION } from 'constant/location';
import { useCategoryFilter } from 'hooks/useCategoryFilter';
import { trafficManagerKeys } from 'lib/query/queryFactory';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import {
  type DisplayPosition,
  getDisplayPosition,
} from 'utils/getDisplayPosition';

export const MapContainer: React.FC = () => {
  const queryClient = useQueryClient();
  const { handleCategoryChange, selectedCategory } = useCategoryFilter();
  const [mapDisplayPosition, setMapDisplayPosition] =
    useState<DisplayPosition | null>(null);

  const handleTileLoaded = (map: kakao.maps.Map) => {
    const newDisplayPosition = getDisplayPosition(map);
    setMapDisplayPosition(newDisplayPosition);
    // queryClient.invalidateQueries({
    //   queryKey: trafficManagerKeys.traffic,
    // });
  };

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
          onTileLoaded={handleTileLoaded}
        >
          {mapDisplayPosition && (
            <MapMarkerComp
              mapDisplayPosition={mapDisplayPosition}
              selectedCategory={selectedCategory}
            />
          )}
        </Map>
      </LegendCheckboxManager>
    </>
  );
};
