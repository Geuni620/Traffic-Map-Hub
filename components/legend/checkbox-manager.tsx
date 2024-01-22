import { CheckboxWithLabel } from 'components/common/checkbox-label';
import { LEGEND_CHECKBOX_LABEL } from 'constant/legend';
import { CategoryFilter } from 'constant/legend';

interface LegendCheckboxManagerProps {
  selectedCategory: Set<CategoryFilter>;
  handleCategoryChange: (id: CategoryFilter, isChecked: boolean) => void;
  children: React.ReactNode;
}

export const LegendCheckboxManager: React.FC<LegendCheckboxManagerProps> = ({
  children,
  selectedCategory,
  handleCategoryChange,
}) => {
  return (
    <>
      <div className="legend-group">
        {LEGEND_CHECKBOX_LABEL.map(({ id, label }) => (
          <CheckboxWithLabel
            onCheckedChange={handleCategoryChange}
            checked={selectedCategory.has(id)}
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
