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
import Link from 'next/link';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createClient } from '@/utils/supabase/client';

export const TrafficHubMap = () => {
  const supabase = createClient();
  const { handleCategoryChange, selectedCategory } = useCategoryFilter();
  const currentZoomLevel = useGoogleMapsZoom();
  const { isFetching } = useTrafficGetQuery({
    categoryFilter: selectedCategory,
    currentZoomLevel: currentZoomLevel,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(result);
  };

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
            <Button className="absolute right-24 z-20 m-5 h-10 w-20 bg-red-500">
              <DialogTrigger>Upload</DialogTrigger>
            </Button>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Excel File</DialogTitle>
                <DialogDescription>
                  Select your file to upload to the server.
                </DialogDescription>
              </DialogHeader>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".xlsx, .xls"
              />
              <Button onClick={uploadFile} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload File'}
              </Button>
            </DialogContent>
          </Dialog>

          <Link className="hover:underline" href="/api/excel/download">
            <Button className="absolute right-0 z-20 m-5 h-10 w-20 bg-red-500">
              Download
            </Button>
          </Link>
        </ExpandableToggleBar>
      </LegendToggleButtonManager>
    </SideMenuBar>
  );
};
