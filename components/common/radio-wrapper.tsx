import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { REGION } from 'constant/geo-location';
import { type CategoryFilter } from 'lib/kakao-map';
import { Fragment } from 'react';

interface RadioButtonHandlerProps {
  selectedCategory: string;
  handleCategoryChange: (value: CategoryFilter) => void;
  children: React.ReactNode;
}

export const RadioButtonHandler: React.FC<RadioButtonHandlerProps> = ({
  children,
  handleCategoryChange,
  selectedCategory,
}) => {
  return (
    <Fragment>
      <RadioGroup
        onValueChange={handleCategoryChange}
        defaultValue={selectedCategory}
        name="traffic-filter"
        className="radio-group"
      >
        {REGION.map(({ label, value }) => {
          return (
            <div key={value} className="radio-item-wrapper">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value}>{label}</Label>
            </div>
          );
        })}
      </RadioGroup>
      {children}
    </Fragment>
  );
};
