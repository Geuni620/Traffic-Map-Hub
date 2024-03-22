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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
          <Dialog>
            <Button className="absolute right-0 z-20 m-5 h-10 w-20 bg-red-500">
              <DialogTrigger>Upload</DialogTrigger>
            </Button>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </ExpandableToggleBar>
      </LegendToggleButtonManager>
    </SideMenuBar>
  );
};
