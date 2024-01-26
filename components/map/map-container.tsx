'use client';

import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { LoadingSpinner } from 'components/common/loading-spinner';
import { LegendCheckboxManager } from 'components/legend/checkbox-manager';
import { MarkerContainer } from 'components/map/marker-container';
import { useCategoryFilter } from 'hooks/useCategoryFilter';
import { GoogleMap } from 'lib/google-map';

const render = (status: Status) => {
  const { handleCategoryChange, selectedCategory } = useCategoryFilter();

  switch (status) {
    case Status.LOADING:
      return <LoadingSpinner />;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return (
        <LegendCheckboxManager
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        >
          <GoogleMap />
          <MarkerContainer />
        </LegendCheckboxManager>
      );
  }
};

export const MapContainer = () => {
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}
      render={render}
      libraries={['marker']}
    />
  );
};
