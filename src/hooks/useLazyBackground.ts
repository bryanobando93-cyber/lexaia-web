import { useEffect, useRef, useState } from 'react';

export const useLazyBackground = (imageUrl: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            // Preload image
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
              setIsLoaded(true);
            };
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before element is visible
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [imageUrl, isLoaded]);

  return { elementRef, isLoaded };
};
