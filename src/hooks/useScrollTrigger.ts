
import { useState, useEffect, RefObject } from 'react';

export const useScrollTrigger = (ref: RefObject<HTMLElement>, threshold: number = 0.3) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold, hasTriggered]);

  return { isVisible, hasTriggered, resetTrigger: () => setHasTriggered(false) };
};
