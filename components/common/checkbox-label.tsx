import { Checkbox } from '@/components/ui/checkbox';

interface CheckboxWithLabelProps {
  id: string;
  label: string;
}

export const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  id,
  label,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} />
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