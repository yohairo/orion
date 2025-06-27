import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
}

const StarField: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  // Generate stars on component mount
  const stars = useMemo(() => {
    const starArray: Star[] = [];
    for (let i = 0; i < 80; i++) {
      starArray.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 20 + 10,
        direction: Math.random() * Math.PI * 2,
      });
    }
    return starArray;
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

  // Calculate connections between nearby stars
  const connections = useMemo(() => {
    const connectionArray: { from: Star; to: Star; distance: number }[] = [];
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const distance = Math.sqrt(
          Math.pow(stars[i].x - stars[j].x, 2) + Math.pow(stars[i].y - stars[j].y, 2)
        );
        if (distance < 150) {
          connectionArray.push({
            from: stars[i],
            to: stars[j],
            distance,
          });
        }
      }
    }
    return connectionArray;
  }, [stars]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        style={{ willChange: 'transform' }}
      >
        {/* Connection lines */}
        {connections.map((connection, index) => (
          <motion.line
            key={`connection-${index}`}
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.to.x}
            y2={connection.to.y}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.1 - (connection.distance / 150) * 0.1,
              x1: connection.from.x,
              y1: connection.from.y,
              x2: connection.to.x,
              y2: connection.to.y,
            }}
            transition={{ duration: 0.5 }}
          />
        ))}

        {/* Stars */}
        {stars.map((star) => (
          <motion.circle
            key={star.id}
            r={star.size}
            fill="white"
            initial={{ 
              x: star.x, 
              y: star.y, 
              opacity: star.opacity 
            }}
            animate={{
              x: [
                star.x,
                star.x + Math.cos(star.direction) * 100,
                star.x + Math.cos(star.direction) * 200,
                star.x,
              ],
              y: [
                star.y,
                star.y + Math.sin(star.direction) * 100,
                star.y + Math.sin(star.direction) * 200,
                star.y,
              ],
              opacity: [star.opacity, star.opacity * 1.5, star.opacity],
            }}
            transition={{
              duration: star.speed,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ willChange: 'transform, opacity' }}
          />
        ))}
      </svg>

      {/* Additional floating particles for depth */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
            }}
            animate={{
              y: [
                Math.random() * dimensions.height,
                -20,
              ],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{ willChange: 'transform, opacity' }}
          />
        ))}
      </div>
    </div>
  );
};

export default StarField; 