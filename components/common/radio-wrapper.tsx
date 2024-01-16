import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { REGION } from 'constant/geo-location';
import { type CategoryFilter } from 'lib/kakao-map';
import { Fragment } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
        {REGION.map(({ label, value }) => (
          <div key={value} className="radio-item-wrapper relative">
            {value === 'toll' ? (
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col  items-center gap-2">
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value}>{label}</Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>2021년 기준</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <>
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={value}>{label}</Label>
              </>
            )}
          </div>
        ))}
      </RadioGroup>
      {children}
    </Fragment>
  );
};
