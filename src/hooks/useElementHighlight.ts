
import { useState, useEffect, RefObject } from 'react';

interface ElementBounds {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const useElementHighlight = (elementId?: string, selector?: string) => {
  const [bounds, setBounds] = useState<ElementBounds | null>(null);

  useEffect(() => {
    if (!elementId && !selector) return;

    const updateBounds = () => {
      let element: HTMLElement | null = null;
      
      if (elementId) {
        element = document.getElementById(elementId);
      } else if (selector) {
        element = document.querySelector(selector) as HTMLElement;
      }

      if (element) {
        const rect = element.getBoundingClientRect();
        setBounds({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
      } else {
        setBounds(null);
      }
    };

    updateBounds();
    
    // Update bounds on window resize
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds);
    
    // Use MutationObserver to detect DOM changes
    const observer = new MutationObserver(updateBounds);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true, 
      attributeFilter: ['class', 'style'] 
    });

    return () => {
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', updateBounds);
      observer.disconnect();
    };
  }, [elementId, selector]);

  return bounds;
};
