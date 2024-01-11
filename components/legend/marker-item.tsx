import { Label } from 'components/ui/label';
import Image from 'next/image';

export const MarkerLegendItem: React.FC<{ label: string; image: string }> = ({
  label,
  image,
}) => (
  <div className="flex items-center gap-2">
    <Image src={image} width={30} height={30} alt="map marker image" />
    <Label>{label}</Label>
  </div>
);
