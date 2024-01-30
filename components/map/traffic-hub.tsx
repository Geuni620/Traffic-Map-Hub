import { LegendCheckboxManager } from 'components/legend/checkbox-manager';
import { MarkerContainer } from 'components/map/marker-container';
import { useCategoryFilter } from 'hooks/useCategoryFilter';
import { GoogleMap } from 'lib/google-map';

export const TrafficHubMap = () => {
  const { handleCategoryChange, selectedCategory } = useCategoryFilter();

  return (
    <LegendCheckboxManager
      selectedCategory={selectedCategory}
      handleCategoryChange={handleCategoryChange}
    >
      <GoogleMap />
      <MarkerContainer selectedCategory={selectedCategory} />
    </LegendCheckboxManager>
  );
};
