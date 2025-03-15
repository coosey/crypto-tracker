import {useEffect, useState} from 'react';
import throttle from 'lodash/throttle';

const mobileTabletsWidthBreakPoint = 1024; 
const mobilesWidthBreakPoint = 768;

export interface TBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  windowInnerWidth: number;
  windowOuterWidth: number;
}

const checkScreenSize = (): TBreakpoints => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      windowInnerWidth: 0,
      windowOuterWidth: 0,
    };
  }

  const windowInnerWidth = window.innerWidth || 0;
  const windowOuterWidth = window.outerWidth || 0;

  return {
    isMobile: windowInnerWidth <= mobilesWidthBreakPoint,
    isTablet:
      windowInnerWidth > mobilesWidthBreakPoint &&
      windowInnerWidth <= mobileTabletsWidthBreakPoint,
    isDesktop: windowInnerWidth > mobileTabletsWidthBreakPoint,
    windowOuterWidth: windowOuterWidth,
    windowInnerWidth: windowInnerWidth,
  };
};

const useResponsive = () => {
  const [breakpoints, setBreakpoints] = useState<TBreakpoints>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    windowInnerWidth: 0,
    windowOuterWidth: 0,
  });

  useEffect(() => {
    // Check is browser environment
    if (typeof window === 'undefined') {
      return;
    }

    setBreakpoints(checkScreenSize());

    const fn = throttle(() => {
      setBreakpoints(checkScreenSize());
    }, 50);

    window.addEventListener('resize', fn);

    return () => {
      window.removeEventListener('resize', fn);
    };
  }, []);

  return breakpoints;
};

export default useResponsive;
