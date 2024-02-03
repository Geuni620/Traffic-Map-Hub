import { ToggleButton } from 'components/common/toggle-button';
import { LEGEND_BUTTON_LABEL } from 'constant/legend';
import { CategoryFilter } from 'constant/legend';

interface LegendToggleButtonManagerProps {
  selectedCategory: Set<CategoryFilter>;
  handleCategoryChange: (id: CategoryFilter, isActive: boolean) => void;
  children: React.ReactNode;
}

export const LegendToggleButtonManager: React.FC<
  LegendToggleButtonManagerProps
> = ({ children, selectedCategory, handleCategoryChange }) => {
  return (
    <>
      <div className="legend-group">
        {LEGEND_BUTTON_LABEL.map(({ id, label }) => (
          <ToggleButton
            onToggleChange={handleCategoryChange}
            active={selectedCategory.has(id)}
            key={id}
            id={id}
            label={label}
          />
        ))}
      </div>
      {children}
    </>
  );
};
