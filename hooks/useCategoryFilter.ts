import { CategoryFilter, LEGEND_BUTTON_LABEL } from 'constant/legend';
import { useState } from 'react';

export const useCategoryFilter = () => {
  const initialCategories = new Set<CategoryFilter>(
    LEGEND_BUTTON_LABEL.map((legend) => legend.id),
  );
  const [selectedCategory, setSelectedCategory] = useState(initialCategories);

  const handleCategoryChange = (id: CategoryFilter, isChecked: boolean) => {
    setSelectedCategory((prev: Set<CategoryFilter>) => {
      const newCategory = new Set(prev);

      if (isChecked) {
        newCategory.add(id);
      } else {
        newCategory.delete(id);
      }

      return newCategory;
    });
  };

  return { selectedCategory, handleCategoryChange };
};
