import { Button } from 'components/ui/button';
import { CategoryFilter } from 'constant/legend';
import { toast } from 'sonner';

interface ToggleButton {
  id: CategoryFilter;
  label: string;
  active: boolean;
  onToggleChange: (id: CategoryFilter, isActive: boolean) => void;
}

export const ToggleButton: React.FC<ToggleButton> = ({
  id,
  label,
  active,
  onToggleChange,
}) => {
  const handleChange = () => {
    onToggleChange(id, !active);
    toast.success('필터가 적용됐어요! 🍀');
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        className="rounded-full shadow-md"
        variant={active ? 'default' : 'secondary'}
        onClick={handleChange}
      >
        {label}
      </Button>
    </div>
  );
};
