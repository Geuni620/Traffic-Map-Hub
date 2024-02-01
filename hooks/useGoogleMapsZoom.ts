import { useExternalValue } from 'external-state';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import { getGoogleMapStore } from 'store/googleMapStore';

import { INITIAL_ZOOM_LEVEL } from '@/constant/location';

export const useGoogleMapsZoom = () => {
  const mapStore = getGoogleMapStore?.();
  if (!mapStore) return;
  const googleMaps = useExternalValue(mapStore);

  const [currentZoomLevel, setCurrentZoomLevel] = useState<number>(
    googleMaps.getZoom() ?? INITIAL_ZOOM_LEVEL,
  );

  useEffect(() => {
    if (!googleMaps) return;

    const debouncedSetZoomLevel = debounce(() => {
      setCurrentZoomLevel(googleMaps.getZoom() ?? INITIAL_ZOOM_LEVEL);
    }, 200);

    const listener = googleMaps.addListener(
      'zoom_changed',
      debouncedSetZoomLevel,
    );

    return () => {
      google.maps.event.removeListener(listener);
      debouncedSetZoomLevel.cancel();
    };
  }, [googleMaps]);

  return currentZoomLevel;
};
