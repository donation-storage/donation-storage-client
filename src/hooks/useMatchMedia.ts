import { useEffect, useState } from 'react';

export const useMatchMedia = (maxWidth = 1023) => {
  const [isMatchMedia, setIsMatchMedia] = useState(false);

  useEffect(() => {
    const checkingWidth = () => {
      if (window.matchMedia(`(max-width: ${maxWidth}px)`).matches) {
        setIsMatchMedia(true);
      } else {
        setIsMatchMedia(false);
      }
    };

    checkingWidth();
    window.addEventListener('resize', checkingWidth);

    return () => window.removeEventListener('resize', checkingWidth);
  }, [maxWidth]);

  return isMatchMedia;
};
