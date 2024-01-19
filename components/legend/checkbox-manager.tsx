import { CheckboxWithLabel } from 'components/common/checkbox-label';
import { LEGEND_CHECKBOX_LABEL } from 'constant/legend';
import { CategoryFilter } from 'constant/legend';
import { useState } from 'react';

interface LegendCheckboxManagerProps {
  children: React.ReactNode;
}

export const LegendCheckboxManager: React.FC<LegendCheckboxManagerProps> = ({
  children,
}) => {
  const [selectedCategories, setSelectedCategories] = useState(
    new Set<CategoryFilter>(),
  );

  const handleCategoryChange = (id: CategoryFilter, isChecked: boolean) => {
    setSelectedCategories((prev: Set<CategoryFilter>) => {
      const newCategories = new Set(prev);
      if (isChecked) {
        newCategories.add(id);
      } else {
        newCategories.delete(id);
      }

      return newCategories;
    });
  };

  console.log('selectedCategories', selectedCategories);

  return (
    <>
      <div className="legend-group">
        {LEGEND_CHECKBOX_LABEL.map(({ id, label }) => (
          <CheckboxWithLabel
            onCheckedChange={handleCategoryChange}
            checked={selectedCategories.has(id)}
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
