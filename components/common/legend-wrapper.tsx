import { Hr } from 'components/common/hr';
import { MarkerLegendItem } from 'components/legend/marker-item';
import { TrafficColorLegendItem } from 'components/legend/traffic-item';
import { Card, CardContent } from 'components/ui/card';
import oc from 'open-color';
import { Fragment } from 'react';

interface LegendWrapperProps {
  children: React.ReactNode;
}

export const LegendViewWrapper: React.FC<LegendWrapperProps> = ({
  children,
}) => {
  return (
    <Fragment>
      <Card className="legend-container">
        <CardContent className="p-6">
          <div className="space-y-1">
            <MarkerLegendItem
              label="고속국도"
              image="/images/h-marker-expressway.png"
            />
            <MarkerLegendItem
              label="일반국도"
              image="/images/h-marker-national.png"
            />
            <MarkerLegendItem
              label="지방도"
              image="/images/h-marker-provincial.png"
            />
            <MarkerLegendItem
              label="국가지원지방도"
              image="/images/h-marker-local.png"
            />
          </div>

          <Hr />

          <div className="space-y-1">
            <TrafficColorLegendItem label="0 ~ 1만" color={oc.green[5]} />
            <TrafficColorLegendItem label="1만 ~ 5만" color={oc.blue[5]} />
            <TrafficColorLegendItem label="5만 ~ 10만" color={oc.orange[5]} />
            <TrafficColorLegendItem label="10만 이상" color={oc.red[6]} />
          </div>
        </CardContent>
      </Card>
      {children}
    </Fragment>
  );
};
