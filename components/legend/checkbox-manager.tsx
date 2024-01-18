import { CheckboxWithLabel } from 'components/common/checkbox-label';
import { LEGEND_CHECKBOX_LABEL } from 'constant/legend';
import { useState } from 'react';

interface LegendCheckboxManagerProps {
  children: React.ReactNode;
}

export type CategoryFilter = 'all' | 'highway' | 'seoul' | 'incheon' | 'toll';

export const LegendCheckboxManager: React.FC<LegendCheckboxManagerProps> = ({
  children,
}) => {
  const [selectedCategories, setSelectedCategories] = useState(
    new Set<CategoryFilter>(),
  );

  const handleCategoryChange = (id: string, isChecked: boolean) => {
    setSelectedCategories((prev) => {
      const newCategories = new Set(prev);
      if (isChecked) {
        newCategories.add(category);
      } else {
        newCategories.delete(category);
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
            onCheckedChange={}
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
