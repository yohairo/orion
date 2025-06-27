import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  color: string;
  layer: number; // for depth
}

const StarField: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  // Generate stars with more realistic space-like properties
  const stars = useMemo(() => {
    const starArray: Star[] = [];
    const colors = ['#ffffff', '#e6f3ff', '#fff9e6', '#f0f8ff', '#ffeaa7'];
    
    for (let i = 0; i < 150; i++) {
      starArray.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 3 + 0.5, // Varied star sizes
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 3 + 2, // Different twinkle speeds
        color: colors[Math.floor(Math.random() * colors.length)],
        layer: Math.floor(Math.random() * 3), // 3 depth layers
      });
    }
    return starArray;
  }, [dimensions]);

  // Generate some larger "distant" stars that barely move
  const distantStars = useMemo(() => {
    const distantArray: Star[] = [];
    const colors = ['#ffffff', '#e6f3ff', '#fff9e6'];
    
    for (let i = 0; i < 30; i++) {
      distantArray.push({
        id: i + 1000,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 4 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        layer: 0,
      });
    }
    return distantArray;
  }, [dimensions]);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Distant background stars - barely visible, no movement */}
      <div className="absolute inset-0 opacity-40">
        {distantStars.map((star) => (
          <motion.div
            key={`distant-${star.id}`}
            className="absolute rounded-full"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            }}
            animate={{
              opacity: [star.opacity * 0.3, star.opacity * 0.8, star.opacity * 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: star.twinkleSpeed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main star field */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute rounded-full"
            style={{
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
              willChange: 'transform, opacity',
              filter: `blur(${star.layer * 0.3}px)`, // Depth blur
            }}
            initial={{
              x: star.x,
              y: star.y,
              opacity: star.opacity,
            }}
            animate={{
              // Gentle drift movement
              x: [
                star.x,
                star.x + (Math.random() - 0.5) * 20,
                star.x,
              ],
              y: [
                star.y,
                star.y + (Math.random() - 0.5) * 20,
                star.y,
              ],
              // Twinkling effect
              opacity: [
                star.opacity * 0.3,
                star.opacity,
                star.opacity * 0.6,
                star.opacity,
                star.opacity * 0.3,
              ],
              // Subtle size pulsing for twinkle
              scale: [0.8, 1, 1.2, 1, 0.8],
            }}
            transition={{
              x: {
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              },
              y: {
                duration: 25 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              },
              opacity: {
                duration: star.twinkleSpeed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              },
              scale: {
                duration: star.twinkleSpeed * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              },
            }}
          />
        ))}
      </div>

      {/* Nebula-like background glow */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>
    </div>
  );
};

export default StarField; 