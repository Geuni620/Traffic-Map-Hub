import { LoadingIndicator } from 'components/common/loading-component';
import { LegendCheckboxManager } from 'components/legend/checkbox-manager';
import { MarkerContainer } from 'components/map/marker-container';
import { useCategoryFilter } from 'hooks/useCategoryFilter';
import { useGoogleMapsZoom } from 'hooks/useGoogleMapsZoom';
import { useTrafficGetQuery } from 'hooks/useTrafficGetQuery';
import { GoogleMap } from 'lib/google-map';

import { INITIAL_ZOOM_LEVEL } from '@/constant/location';

export const TrafficHubMap = () => {
  const { handleCategoryChange, selectedCategory } = useCategoryFilter();
  const currentZoomLevel = useGoogleMapsZoom();
  const { isFetching } = useTrafficGetQuery({
    categoryFilter: selectedCategory,
    currentZoomLevel: currentZoomLevel,
  });

  return (
    <LegendCheckboxManager
      selectedCategory={selectedCategory}
      handleCategoryChange={handleCategoryChange}
    >
      <GoogleMap />
      <MarkerContainer
        selectedCategory={selectedCategory}
        currentZoomLevel={currentZoomLevel ?? INITIAL_ZOOM_LEVEL}
      />
      {/* <LoadingIndicator isFetching={isFetching} /> */}
    </LegendCheckboxManager>
  );
};
