import { REGION_COORDINATES } from 'constant/location';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getGoogleMapStore } from 'store/googleMapStore';

type ExpandableToggleBarProps = {
  children: React.ReactNode;
};

export const ExpandableToggleBar: React.FC<ExpandableToggleBarProps> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRegionValue, setSelectedRegionValue] = useState<string | null>(
    null,
  );
  const mapStore = getGoogleMapStore?.();
  const googleMap = mapStore?.getState();

  useEffect(() => {
    if (selectedRegionValue && googleMap) {
      const selectedRegion = REGION_COORDINATES.find(
        (region) => region.value === selectedRegionValue,
      );

      if (selectedRegion) {
        const { latitude, longitude } = selectedRegion;

        googleMap.moveCamera({
          center: { lat: latitude, lng: longitude },
          zoom: 10,
        });
      }
    }
  }, [googleMap, selectedRegionValue]);

  const toggleBar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="fixed bottom-0 right-0 z-20 m-5">
        <div
          className="cursor-pointer rounded-full bg-white"
          onClick={toggleBar}
        >
          <Image
            src="/favicon.png"
            alt="expandable-toggle-bar"
            width={50}
            height={50}
          />
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="mt-2 overflow-hidden rounded-lg bg-white shadow-custom"
            >
              {REGION_COORDINATES.map((region) => {
                return (
                  <motion.div
                    key={region.value}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex cursor-pointer items-center justify-center border-b border-gray-300 py-2"
                    onClick={() => {
                      setSelectedRegionValue(region.value);
                    }}
                  >
                    {region.label}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {children}
    </>
  );
};
