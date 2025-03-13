// Easter egg... try to find it!

import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const MandalorianSpeeder = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [speederPosition, setSpeederPosition] = useState({ x: -200, y: 0 });
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const speederRef = useRef(null);
  const triggerAreaRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  
  const handleMouseEnter = (e) => {
    if (!isExiting && !isVisible) {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      
      setIsVisible(true);
      setIsMovingLeft(false);
      
      setSpeederPosition({ 
        x: -200, 
        y: e.clientY - 30 
      });
      
      setTimeout(() => {
        setSpeederPosition({ 
          x: e.clientX - 65,
          y: e.clientY - 30 
        });
      }, 50);
    }
  };
  
  const handleMouseMove = (e) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
  };
  
  const handleMouseLeave = () => {
    if (isVisible && !isExiting) {
      setIsMovingLeft(true);
      
      setTimeout(() => {
        setSpeederPosition(prev => ({ 
          ...prev,
          x: -200
        }));
      }, 50);
      
      setTimeout(() => {
        setIsVisible(false);
        setIsMovingLeft(false);
      }, 600);
    }
  };
  
  const handleSpeederClick = () => {
    if (isVisible && !isExiting) {
      setIsExiting(true);
      setIsMovingLeft(false);
      
      setSpeederPosition(prev => ({ 
        ...prev,
        x: window.innerWidth + 200
      }));
      
      setTimeout(() => {
        window.location.href = "https://archive.vincentcampanaro.com";
      }, 600);
    }
  };
  
  return (
    <div className={styles.speederTriggerArea} ref={triggerAreaRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>
      {isVisible && (
        <div 
          ref={speederRef}
          className={`
            ${styles.mandoSpeeder} 
            ${isExiting ? styles.exiting : ''} 
            ${isMovingLeft ? styles.flippedLeft : ''}
          `}
          style={{
            left: `${speederPosition.x}px`,
            top: `${speederPosition.y}px`,
          }}
          onClick={handleSpeederClick}
        >
          <img 
            src="https://i.imgur.com/bJ7csrw.png" 
            alt="Mandalorian Speeder" 
            className={styles.speederImage}
          />
          <div className={styles.engineTrail}></div>
        </div>
      )}
    </div>
  );
};

export default MandalorianSpeeder;