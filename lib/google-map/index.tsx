import { useExternalValue } from 'external-state';
import { getGoogleMapStore } from 'store/googleMapStore';

export const GoogleMap = () => {
  const googleMap = useExternalValue(getGoogleMapStore());

  return <></>;
};
