'use client';

import { INITIAL_ZOOM_LEVEL } from 'constant/location';
import { store } from 'external-state';
import { isBrowser } from 'utils/isBrowser';

// constant/location.ts LOCATION 동일
export const INITIAL_CENTER = {
  lat: 37.476,
  lng: 126.981,
};

export const getGoogleMapStore = (() => {
  if (!isBrowser()) {
    return;
  }

  let googleMap: google.maps.Map;

  const container = document.createElement('div');

  container.id = 'map';
  container.style.minHeight = '100vh';

  document.body.appendChild(container);

  return () => {
    if (!googleMap) {
      googleMap = new window.google.maps.Map(container, {
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM_LEVEL,
        disableDefaultUI: true,
        mapId: process.env.NEXT_PUBLIC_MAPS_ID,
      });
    }

    return store<google.maps.Map>(googleMap);
  };
})();
