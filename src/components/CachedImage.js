'use client';

import { useEffect, useRef, useState } from 'react';
import useImageCache from '@/hooks/useImageCache';

const CachedImage = ({ src, alt, className, ...props }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const imageRef = useRef(null);
  const { cachedImage, loading, error } = useImageCache(shouldLoad ? src : null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={imageRef} 
      className={`${className} relative bg-gray-100`}
      style={{ minHeight: '200px' }}
    >
      {shouldLoad ? (
        <>
          <img
            src={cachedImage}
            alt={alt}
            className={`${className} absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              loading ? 'opacity-0' : 'opacity-100'
            }`}
            {...props}
          />
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">Failed to load image</span>
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default CachedImage; 