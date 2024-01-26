'use client';

import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { LoadingSpinner } from 'components/common/loading-spinner';
import { TrafficHubMap } from 'components/map/traffic-hub';

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <LoadingSpinner />;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <TrafficHubMap />;
  }
};

export const MapContainer = () => {
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}
      render={render}
      libraries={['marker']}
    />
  );
};
