import { REGION_COORDINATES } from 'constant/location';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { getGoogleMapStore } from 'store/googleMapStore';
import { useOnClickOutside } from 'usehooks-ts';

type ExpandableToggleBarProps = {
  children: React.ReactNode;
};

export const ExpandableToggleBar: React.FC<ExpandableToggleBarProps> = ({
  children,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
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

  const handleClickOutside = () => {
    setIsExpanded(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const toggleBar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div ref={ref} className="fixed bottom-0 right-0 z-20 m-5">
        <div
          className="cursor-pointer rounded-full bg-white p-0 md:p-2"
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
              animate={{ height: '60vh' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="hide-scrollbar mt-2 max-h-[50vh] overflow-auto overflow-x-hidden rounded-lg bg-white shadow-custom md:max-h-full"
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
