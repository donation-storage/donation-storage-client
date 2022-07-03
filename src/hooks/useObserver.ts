/* eslint-disable unicorn/no-null */
import { useEffect } from 'react';

interface IUseObserver {
  target: React.RefObject<HTMLDivElement> | null;
  onIntersect: IntersectionObserverCallback;
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
}

export const useObserver = ({
  target,
  onIntersect,
  root = null,
  rootMargin = '0px',
  threshold = 1,
}: IUseObserver) => {
  useEffect(() => {
    let observer: IntersectionObserver;

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(target.current);
    }

    return () => observer && observer.disconnect();
  }, [target, rootMargin, threshold, root, onIntersect]);
};
