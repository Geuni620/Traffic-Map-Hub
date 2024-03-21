import { LoadingIndicator } from 'components/common/loading-component';
import { ExpandableToggleBar } from 'components/legend/expandable-toggle-bar';
import { SideMenuBar } from 'components/legend/side-menu-bar';
import { LegendToggleButtonManager } from 'components/legend/toggle-button-manager';
import { MarkerContainer } from 'components/map/marker-container';
import { Button } from 'components/ui/button';
import { INITIAL_ZOOM_LEVEL } from 'constant/location';
import { useCategoryFilter } from 'hooks/useCategoryFilter';
import { useGoogleMapsZoom } from 'hooks/useGoogleMapsZoom';
import { useTrafficGetQuery } from 'hooks/useTrafficGetQuery';
import { GoogleMap } from 'lib/google-map';

export const TrafficHubMap = () => {
  const { handleCategoryChange, selectedCategory } = useCategoryFilter();
  const currentZoomLevel = useGoogleMapsZoom();
  const { isFetching } = useTrafficGetQuery({
    categoryFilter: selectedCategory,
    currentZoomLevel: currentZoomLevel,
  });

  return (
    <SideMenuBar>
      <LegendToggleButtonManager
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      >
        <ExpandableToggleBar>
          <GoogleMap />
          <MarkerContainer
            selectedCategory={selectedCategory}
            currentZoomLevel={currentZoomLevel ?? INITIAL_ZOOM_LEVEL}
          />
          <LoadingIndicator isFetching={isFetching} />
          <Button className="absolute right-0 z-20 m-5 h-10 w-20 bg-red-500">
            Upload
          </Button>
        </ExpandableToggleBar>
      </LegendToggleButtonManager>
    </SideMenuBar>
  );
};
