import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import StarField from './StarField';
import Navigation from './Navigation';

// Sub-components
const AnnouncementBadge: React.FC = () => (
  <motion.div
    className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
  >
    <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
      New
    </span>
    <span className="text-purple-400 text-sm font-medium">
      Orion Intelligence version II
    </span>
  </motion.div>
);

const ShootingStars: React.FC = () => {
  const [dimensions, setDimensions] = React.useState({ width: 1200, height: 800 });
  const [deviceInfo, setDeviceInfo] = React.useState({
    isMobile: false,
    isTablet: false,
    prefersReducedMotion: false,
    isLowEnd: false,
  });

  React.useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const detectDevice = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      
      // Safe feature detection with fallbacks
      let prefersReducedMotion = false;
      let isLowEnd = false;
      
      try {
        prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      } catch (e) {
        // Fallback for older browsers
        prefersReducedMotion = false;
      }
      
             try {
         // Detect low-end devices
         const nav = navigator as any;
         isLowEnd = (
           (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
           (nav.deviceMemory && nav.deviceMemory <= 4) ||
           /Android.+Mobile|iPhone|iPod/.test(navigator.userAgent)
         );
       } catch (e) {
         // Fallback detection
         isLowEnd = isMobile;
       }

      setDeviceInfo({
        isMobile,
        isTablet,
        prefersReducedMotion,
        isLowEnd: isLowEnd || false,
      });
    };

    updateDimensions();
    detectDevice();
    
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('resize', detectDevice);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('resize', detectDevice);
    };
  }, []);

  const asteroids = React.useMemo(() => {
    // Increase asteroid count for more frequent appearance
    const asteroidCount = deviceInfo.prefersReducedMotion ? 0 : 
                         deviceInfo.isMobile ? 5 : 
                         deviceInfo.isTablet ? 7 : 10;
    
    if (asteroidCount === 0) return [];
    
    return Array.from({ length: asteroidCount }, (_, i) => {
      // Perfectly linear 15° trajectory - mostly vertical with slight rightward drift
      const trajectoryAngle = (15 * Math.PI) / 180; // 15° in radians for more vertical movement
      
      // Simple distance calculation for complete screen coverage
      const screenDiagonal = Math.sqrt(dimensions.width ** 2 + dimensions.height ** 2);
      const trajectoryDistance = screenDiagonal + 800; // Extra margin
      
      // Spread asteroids along perpendicular line to ensure parallel movement
      const spreadDistance = (i * 120) + Math.random() * 180;
      const perpendicularAngle = trajectoryAngle - (Math.PI / 2); // Exactly 90° perpendicular to 15°
      
      // Base starting position (off-screen top-left)
      const baseStartX = -400;
      const baseStartY = -300;
      
      // Each asteroid positioned on perpendicular line for perfect parallel movement
      const startX = baseStartX + Math.cos(perpendicularAngle) * spreadDistance;
      const startY = baseStartY + Math.sin(perpendicularAngle) * spreadDistance;
      
      // Linear movement: exactly 35° from each starting position
      const endX = startX + Math.cos(trajectoryAngle) * trajectoryDistance;
      const endY = startY + Math.sin(trajectoryAngle) * trajectoryDistance;
      
      return {
        id: i,
        delay: i * (deviceInfo.isMobile ? 1.5 : 1) + Math.random() * 2,
        duration: deviceInfo.isMobile ? 2 + Math.random() * 1 : 1.8 + Math.random() * 1.2,
        startX,
        startY,
        endX,
        endY,
        size: deviceInfo.isMobile ? 1.0 + Math.random() * 1.0 : 1.2 + Math.random() * 1.5,
        brightness: deviceInfo.isMobile ? 0.7 + Math.random() * 0.3 : 0.8 + Math.random() * 0.2,
      };
    });
  }, [dimensions, deviceInfo]);

  const getTrailConfig = () => {
    if (deviceInfo.isMobile) {
      return {
        mainTrail: { width: 45, blur: '0px', opacity: 0.7 },
        secondaryTrail: { width: 70, blur: '0.2px', opacity: 0.4 },
        outerGlow: null, // Skip outer glow on mobile
      };
    } else if (deviceInfo.isTablet || deviceInfo.isLowEnd) {
      return {
        mainTrail: { width: 60, blur: '0.1px', opacity: 0.8 },
        secondaryTrail: { width: 90, blur: '0.3px', opacity: 0.5 },
        outerGlow: { width: 120, blur: '0.5px', opacity: 0.3 },
      };
    } else {
      return {
        mainTrail: { width: 80, blur: '0.2px', opacity: 0.9 },
        secondaryTrail: { width: 120, blur: '0.5px', opacity: 0.6 },
        outerGlow: { width: 160, blur: '1px', opacity: 0.4 },
      };
    }
  };

  const trailConfig = getTrailConfig();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {asteroids.map((asteroid) => (
        <motion.div
          key={asteroid.id}
          className="absolute"
          style={{
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            perspective: '1000px',
          }}
          initial={{
            x: asteroid.startX,
            y: asteroid.startY,
            opacity: 0,
          }}
          animate={{
            x: asteroid.endX,
            y: asteroid.endY,
            opacity: [0, 0, asteroid.brightness, asteroid.brightness, 0, 0],
          }}
          transition={{
            duration: asteroid.duration,
            delay: asteroid.delay,
            repeat: Infinity,
            repeatDelay: deviceInfo.isMobile ? 3 + Math.random() * 5 : 2 + Math.random() * 4,
            ease: "linear",
            repeatType: "loop", // Ensures clean restart cycle
          }}
        >
          {/* Main asteroid body */}
          <div
            className="bg-white rounded-full"
            style={{
              width: `${asteroid.size}px`,
              height: `${asteroid.size}px`,
              willChange: 'auto',
              boxShadow: deviceInfo.isMobile ? 
                `0 0 ${asteroid.size * 2}px rgba(255, 255, 255, 0.8)` :
                `
                  0 0 ${asteroid.size * 3}px rgba(255, 255, 255, 0.9),
                  0 0 ${asteroid.size * 6}px rgba(168, 85, 247, 0.5),
                  0 0 ${asteroid.size * 12}px rgba(168, 85, 247, 0.2)
                `,
            }}
          />
          
          {/* Adaptive trailing effect */}
          {/* Main trail */}
          <div
            className="absolute top-0 left-0"
            style={{
              width: `${asteroid.size * trailConfig.mainTrail.width}px`,
              height: `${asteroid.size * 0.6}px`,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 20%, rgba(168,85,247,0.4) 50%, rgba(168,85,247,0.2) 80%, transparent 100%)',
              transform: 'rotate(-165deg) translateX(10%) translateY(-50%)',
              filter: `blur(${trailConfig.mainTrail.blur})`,
              borderRadius: '50px',
              opacity: trailConfig.mainTrail.opacity,
              willChange: 'auto',
            }}
          />
          
          {/* Secondary trail */}
          <div
            className="absolute top-0 left-0"
            style={{
              width: `${asteroid.size * trailConfig.secondaryTrail.width}px`,
              height: `${asteroid.size * 0.3}px`,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(168,85,247,0.3) 30%, rgba(168,85,247,0.15) 60%, transparent 100%)',
              transform: 'rotate(-165deg) translateX(15%) translateY(-50%)',
              filter: `blur(${trailConfig.secondaryTrail.blur})`,
              borderRadius: '50px',
              opacity: trailConfig.secondaryTrail.opacity,
              willChange: 'auto',
            }}
          />
          
          {/* Outer glow trail - only on desktop */}
          {trailConfig.outerGlow && (
            <div
              className="absolute top-0 left-0"
              style={{
                width: `${asteroid.size * trailConfig.outerGlow.width}px`,
                height: `${asteroid.size * 0.8}px`,
                background: 'linear-gradient(90deg, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.1) 40%, transparent 100%)',
                transform: 'rotate(-165deg) translateX(20%) translateY(-50%)',
                filter: `blur(${trailConfig.outerGlow.blur})`,
                borderRadius: '50px',
                opacity: trailConfig.outerGlow.opacity,
                willChange: 'auto',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

const MainHeadline: React.FC = () => (
  <motion.h1
    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center mb-6 leading-tight tracking-tight"
    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.0, duration: 0.8 }}
  >
    Generate Real Results,
    <br />
    <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
      Not Just Features
    </span>
  </motion.h1>
);

const Subheadline: React.FC = () => (
  <motion.p
    className="text-lg sm:text-xl text-gray-400 text-center max-w-3xl mx-auto mb-10 leading-relaxed"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.6 }}
  >
    While others promise features, we deliver measurable outcomes. Our clients see 40% revenue growth 
    and 60% cost reduction through intelligent automation that works.
  </motion.p>
);

const CTAButtons: React.FC = () => (
  <motion.div
    className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.4, duration: 0.6 }}
  >
    <motion.button
      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <Phone size={20} />
      <span>Book a Call</span>
    </motion.button>
    
    <motion.button
      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 text-lg font-medium px-8 py-4 border border-gray-700 rounded-lg hover:border-gray-600"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>View Case Studies</span>
      <ArrowRight size={20} />
    </motion.button>
  </motion.div>
);

const TrustIndicator: React.FC = () => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.6, duration: 0.4 }}
  >
    <p className="text-gray-500 text-sm mb-6">Trusted by 2,800+ companies worldwide</p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-4xl mx-auto opacity-60">
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-400 mb-1">40%</div>
        <div className="text-xs text-gray-500">Avg Revenue Growth</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-400 mb-1">60%</div>
        <div className="text-xs text-gray-500">Cost Reduction</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-400 mb-1">25+</div>
        <div className="text-xs text-gray-500">Hours Saved/Week</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-400 mb-1">99.8%</div>
        <div className="text-xs text-gray-500">Accuracy Rate</div>
      </div>
    </div>
  </motion.div>
);

// Main Hero Component
const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-zinc-950 overflow-hidden flex flex-col">
      {/* Animated Background */}
      <StarField />
      
      {/* Shooting Stars/Asteroids */}
      <ShootingStars />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <AnnouncementBadge />
          <MainHeadline />
          <Subheadline />
          <CTAButtons />
          <TrustIndicator />
        </div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/50 pointer-events-none" />
      
      {/* Additional Visual Effects */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      {/* Planet Image at Bottom Right */}
      <img
        src="https://framerusercontent.com/images/mxEaXiTolMxyIpLhCGhu0k1J4MI.png"
        alt="Planet"
        className="absolute -bottom-10 w-full lg:-bottom-40 pointer-events-none select-none z-0"
        style={{ objectFit: 'contain' }}
        draggable={false}
      />
    </section>
  );
};

export default Hero; 