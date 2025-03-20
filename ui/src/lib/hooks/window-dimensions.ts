import ***REMOVED*** from "@/utils/deviceType";
import { useState, useEffect } from "react";

interface WindowDimensionsParams {
    getHeight?: boolean;
    getDeviceType?: boolean;
}

type ***REMOVED***<T extends WindowDimensionsParams> = {
    width: number;
} & (T['getHeight'] extends true ? { height: number } : {})
  & (T['getDeviceType'] extends true ? { deviceType: 'mobile' | 'tablet' | 'midTablet' | 'laptop' | 'desktop' | 'wide' } : {});


/**
 *
 * A react hook that returns the width,height and the device type.
 * @description A react hook that returns the width,height and the device type.
 * until the issue above is fixed.
 * @param {WindowDimensionsParams} params
 * @returns {***REMOVED***}
 */
export const useWindowDimensionsAndDevice = <T extends WindowDimensionsParams>(params?: T): ***REMOVED***<T> => {
  const { getDeviceType, getHeight } = params || {};
  const [***REMOVED***, ***REMOVED***] = useState<***REMOVED***<T>>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    ...(getHeight && { height: typeof window !== 'undefined' ? window.innerHeight : 0 }),
    ...(getDeviceType && { deviceType: typeof window !== 'undefined' ? ***REMOVED***() : 'desktop' }),
  } as ***REMOVED***<T>));

  useEffect(() => {
    const handleResize = () => {
      ***REMOVED***(***REMOVED*** => ({
        ...***REMOVED***,
        width: window.innerWidth,
        ...(getHeight && { height: window.innerHeight }),
        ...(getDeviceType && { deviceType: ***REMOVED***() }),
      }));
    };

    if (typeof window !== 'undefined') {
      window.***REMOVED***('resize', handleResize);
      handleResize();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.***REMOVED***('resize', handleResize);
      }
    };
  }, [getHeight, getDeviceType]);

  return ***REMOVED***;
};
