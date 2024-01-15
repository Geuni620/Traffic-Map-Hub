import { Label } from 'components/ui/label';

interface TrafficItemProps {
  label: string;
  color: string;
}

export const TrafficColorLegendItem: React.FC<TrafficItemProps> = ({
  label,
  color,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-[30px] w-[30px] rounded-lg"
        style={{
          backgroundColor: color,
        }}
      ></div>
      <Label>{label}</Label>
    </div>
  );
};
