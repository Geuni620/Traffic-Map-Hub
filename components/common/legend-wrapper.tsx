import { Hr } from 'components/common/hr';
import { MarkerLegendItem } from 'components/legend/marker-item';
import { TrafficColorLegendItem } from 'components/legend/traffic-item';
import { Card, CardContent } from 'components/ui/card';
import { MARKER_ITEM } from 'constant/marker';
import { Fragment } from 'react';

import { TRAFFIC_RANGE } from '@/constant/traffic';

interface LegendWrapperProps {
  children: React.ReactNode;
}

export const LegendViewWrapper: React.FC<LegendWrapperProps> = ({
  children,
}) => {
  const createTrafficRangeLabel = (limit: number) => {
    switch (limit) {
      case 10000:
        return '0 ~ 1만';
      case 50000:
        return '1만 ~ 5만';
      case 100000:
        return '5만 ~ 10만';
      default:
        return '10만 이상';
    }
  };

  return (
    <Fragment>
      <Card className="legend-container">
        <CardContent className="p-6">
          <div className="space-y-1">
            {MARKER_ITEM.map(({ label, image }) => (
              <MarkerLegendItem key={label} label={label} image={image} />
            ))}
          </div>
          <Hr />
          <div className="space-y-1">
            {TRAFFIC_RANGE.map((range, index) => (
              <TrafficColorLegendItem
                key={index}
                label={createTrafficRangeLabel(range.limit)}
                color={range.color}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      {children}
    </Fragment>
  );
};
