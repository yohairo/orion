import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  color: string;
  layer: number;
}

const StarField: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isLowEnd: false,
    supportsWebGL: true,
  });
  
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Optimized device detection
  const updateDeviceInfo = useCallback(() => {
    const width = window.innerWidth;
    const isMobile = width < 768;
    
    // Detect low-end devices more efficiently
    const isLowEnd = isMobile || 
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      (navigator as any).deviceMemory <= 4;
    
    const supportsWebGL = (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch (e) {
        return false;
      }
    })();

    setDeviceInfo({ isMobile, isLowEnd, supportsWebGL });
  }, []);

  // Throttled resize handler
  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    updateDimensions();
    updateDeviceInfo();
    
    // Throttled resize listener
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateDimensions();
        updateDeviceInfo();
      }, 250);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [updateDimensions, updateDeviceInfo]);

  // Adaptive star generation based on device capabilities
  const stars = useMemo(() => {
    if (shouldReduceMotion) return [];
    
    // Drastically reduce star count for performance
    const starCount = deviceInfo.isMobile ? 25 : deviceInfo.isLowEnd ? 40 : 60;
    const starArray: Star[] = [];
    const colors = ['#ffffff', '#e6f3ff', '#fff9e6'];
    
    for (let i = 0; i < starCount; i++) {
      starArray.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: deviceInfo.isMobile ? 1 + Math.random() * 1.5 : 1.5 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.5,
        twinkleSpeed: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        layer: Math.floor(Math.random() * 2), // Reduced layers
      });
    }
    return starArray;
  }, [dimensions, deviceInfo, shouldReduceMotion]);

  // Static background stars for depth without animation cost
  const staticStars = useMemo(() => {
    const staticCount = deviceInfo.isMobile ? 15 : 25;
    const staticArray: Star[] = [];
    
    for (let i = 0; i < staticCount; i++) {
      staticArray.push({
        id: i + 1000,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: 0.5 + Math.random() * 1,
        opacity: 0.2 + Math.random() * 0.3,
        twinkleSpeed: 0,
        color: '#ffffff',
        layer: 0,
      });
    }
    return staticArray;
  }, [dimensions, deviceInfo]);

  // Return simplified version for reduced motion
  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          {staticStars.slice(0, 10).map((star) => (
            <div
              key={`static-${star.id}`}
              className="absolute rounded-full bg-white"
              style={{
                left: star.x,
                top: star.y,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      data-animate
    >
      {/* Static background stars - subtle movement */}
      <div className="absolute inset-0 opacity-20">
        {staticStars.map((star) => (
          <motion.div
            key={`static-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
            }}
            initial={{
              x: star.x,
              y: star.y,
              opacity: star.opacity,
            }}
            animate={{
              // Very subtle drift for depth
              x: [
                star.x,
                star.x + (Math.random() - 0.5) * 4,
                star.x,
              ],
              y: [
                star.y,
                star.y + (Math.random() - 0.5) * 3,
                star.y,
              ],
              // Gentle opacity variation
              opacity: [
                star.opacity * 0.7,
                star.opacity,
                star.opacity * 0.7,
              ],
            }}
            transition={{
              x: {
                duration: 40 + Math.random() * 30,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 20,
              },
              y: {
                duration: 50 + Math.random() * 40,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 25,
              },
              opacity: {
                duration: 8 + Math.random() * 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 10,
              },
            }}
          />
        ))}
      </div>

      {/* Animated stars - reduced count and complexity */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute rounded-full"
            style={{
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              // Simplified shadow - no blur on mobile
              boxShadow: deviceInfo.isMobile 
                ? `0 0 ${star.size * 2}px ${star.color}` 
                : `0 0 ${star.size * 3}px ${star.color}`,
              willChange: 'opacity, transform',
              transform: 'translateZ(0)', // Force GPU acceleration
            }}
            initial={{
              x: star.x,
              y: star.y,
              opacity: star.opacity,
            }}
            animate={{
              // Enhanced animations - more subtle movement on all devices
              x: [
                star.x,
                star.x + (Math.random() - 0.5) * (deviceInfo.isMobile ? 8 : 15),
                star.x + (Math.random() - 0.5) * (deviceInfo.isMobile ? 6 : 12),
                star.x,
              ],
              y: [
                star.y,
                star.y + (Math.random() - 0.5) * (deviceInfo.isMobile ? 6 : 12),
                star.y + (Math.random() - 0.5) * (deviceInfo.isMobile ? 8 : 15),
                star.y,
              ],
              // Enhanced twinkling with more variation
              opacity: [
                star.opacity * 0.3,
                star.opacity * 0.8,
                star.opacity,
                star.opacity * 0.6,
                star.opacity * 0.3,
              ],
              // Gentle rotation for extra life
              rotate: [
                0,
                (Math.random() - 0.5) * 360,
                0,
              ],
              // Subtle scale pulsing
              scale: [
                1,
                1 + (Math.random() * 0.3),
                1,
              ],
            }}
            transition={{
              x: {
                duration: deviceInfo.isMobile ? 20 + Math.random() * 15 : 18 + Math.random() * 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 8,
              },
              y: {
                duration: deviceInfo.isMobile ? 25 + Math.random() * 10 : 22 + Math.random() * 14,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 6,
              },
              opacity: {
                duration: star.twinkleSpeed * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              },
              rotate: {
                duration: 30 + Math.random() * 20,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 10,
              },
              scale: {
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              },
            }}
          />
        ))}
      </div>

      {/* Simplified nebula effect - only on desktop */}
      {!deviceInfo.isMobile && !deviceInfo.isLowEnd && (
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
              willChange: 'auto',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(StarField); 