import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';

const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);
  
  // Handle image transition
  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setPreviousIndex(activeIndex);
      setIsTransitioning(true);
      setActiveIndex((current) => (current + 1) % images.length);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set transitioning to false after animation completes
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 800); // Should match transition duration
      
    }, 3000); // Change image every 3 seconds
    
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [images, activeIndex]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  if (!images || images.length === 0) return null;
  
  // Preload images for smoother transitions
  useEffect(() => {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);
  
  return (
    <div className={styles.tooltipCarousel}>
      {/* Container for images */}
      <div className={styles.carouselImagesContainer}>
        {images.map((src, index) => (
          <img 
            key={index}
            src={src}
            alt=""
            className={`
              ${styles.carouselImage} 
              ${index === activeIndex ? styles.active : ''}
              ${isTransitioning && index === previousIndex ? styles.fadeOut : ''}
            `}
            style={{
              zIndex: index === activeIndex ? 2 : (index === previousIndex ? 1 : 0)
            }}
          />
        ))}
      </div>
      
      <div className={styles.carouselOverlay} />
      
      {/* Only show counter and dots if there are multiple images */}
      {images.length > 1 && (
        <>
          <div className={styles.imageCounter}>
            {activeIndex + 1} / {images.length}
          </div>
          
          <div className={styles.carouselDots}>
            {images.map((_, index) => (
              <div 
                key={index} 
                className={`${styles.carouselDot} ${index === activeIndex ? styles.active : ''}`}
                onClick={() => {
                  setPreviousIndex(activeIndex);
                  setIsTransitioning(true);
                  setActiveIndex(index);
                  
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                  
                  timeoutRef.current = setTimeout(() => {
                    setIsTransitioning(false);
                  }, 800);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;