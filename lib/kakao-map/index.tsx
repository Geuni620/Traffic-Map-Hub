// TODO: 여기서 use client 쓰는게 아니라, 하나씩 아래로 내려주자
'use client';

import { type TrafficHub } from 'app/page';
import { LegendCheckboxManager } from 'components/legend/checkbox-manager';
import { MapMarkerComp } from 'components/map/map-marker';
import { LOCATION } from 'constant/location';
import { useCategoryFilter } from 'hooks/useCategoryFilter';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

interface MapContainerProps {
  data: TrafficHub[];
}

export const MapContainer: React.FC<MapContainerProps> = ({ data }) => {
  const { handleCategoryChange, selectedCategory } = useCategoryFilter();
  const [zoomLevel, setZoomLevel] = useState(8);
  const [mapBounds, setMapBounds] = useState(null);

  const handleZoomChanged = (map) => {
    setZoomLevel(map.getLevel());
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
          maxLevel={12}
          onZoomChanged={handleZoomChanged}
        >
          <MapMarkerComp
            selectedCategory={selectedCategory}
            zoomLevel={zoomLevel}
          />
        </Map>
      </LegendCheckboxManager>
    </>
  );
};
