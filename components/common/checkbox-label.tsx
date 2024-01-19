import { Checkbox } from '@/components/ui/checkbox';
import { CategoryFilter } from '@/constant/legend';

interface CheckboxWithLabelProps {
  id: CategoryFilter;
  label: string;
  checked: boolean;
  onCheckedChange: (id: CategoryFilter, isChecked: boolean) => void;
}

export const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  id,
  label,
  checked,
  onCheckedChange,
}) => {
  const handleChange = (checked: boolean) => {
    onCheckedChange(id, checked);
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} onCheckedChange={handleChange} checked={checked} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    </div>
  );
};
