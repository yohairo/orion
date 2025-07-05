import React, { lazy } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Navigation from './Navigation';

// Lazy load StarField for better initial performance
const LazyStarField = lazy(() => import('./StarField'));

// Sub-components
const AnnouncementBadge: React.FC = () => (
  <motion.div
    className="inline-flex items-center space-x-1 bg-primary-400/10 border border-primary-400/20 rounded-full px-4 py-2 mb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
  >
    <span className="bg-primary-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
      Limited
    </span>
    <span className="text-primary-400 text-sm font-medium">
      {" "}Only 3 new clients per month
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

  const shouldReduceMotion = useReducedMotion();

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
      
      // Optimized feature detection
      let prefersReducedMotion = false;
      let isLowEnd = false;
      
      try {
        prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      } catch (e) {
        prefersReducedMotion = false;
      }
      
      try {
        // Simplified low-end device detection
        const nav = navigator as any;
        isLowEnd = isMobile || 
          (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
          (nav.deviceMemory && nav.deviceMemory <= 4);
      } catch (e) {
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
    
    // Throttled resize listeners
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateDimensions();
        detectDevice();
      }, 250);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const asteroids = React.useMemo(() => {
    // Drastically reduce asteroid count for performance
    const asteroidCount = shouldReduceMotion || deviceInfo.prefersReducedMotion ? 0 : 
                         deviceInfo.isMobile ? 2 : 
                         deviceInfo.isTablet ? 3 : 4;
    
    if (asteroidCount === 0) return [];
    
    return Array.from({ length: asteroidCount }, (_, i) => {
      // Simplified trajectory calculation
      const trajectoryAngle = (15 * Math.PI) / 180;
      const screenDiagonal = Math.sqrt(dimensions.width ** 2 + dimensions.height ** 2);
      const trajectoryDistance = screenDiagonal + 400; // Reduced margin
      
      const spreadDistance = (i * 150) + Math.random() * 100;
      const perpendicularAngle = trajectoryAngle - (Math.PI / 2);
      
      const baseStartX = -400; // Reduced from -600
      const baseStartY = -50;
      
      const startX = baseStartX + Math.cos(perpendicularAngle) * spreadDistance;
      const startY = baseStartY + Math.sin(perpendicularAngle) * spreadDistance;
      
      const endX = startX + Math.cos(trajectoryAngle) * trajectoryDistance;
      const endY = startY + Math.sin(trajectoryAngle) * trajectoryDistance;
      
      return {
        id: i,
        delay: i * 2 + Math.random() * 3,
        duration: deviceInfo.isMobile ? 1.5 + Math.random() * 0.5 : 2 + Math.random() * 1,
        startX,
        startY,
        endX,
        endY,
        size: deviceInfo.isMobile ? 0.8 + Math.random() * 0.5 : 1 + Math.random() * 1,
        brightness: deviceInfo.isMobile ? 0.6 + Math.random() * 0.2 : 0.7 + Math.random() * 0.3,
      };
    });
  }, [dimensions, deviceInfo, shouldReduceMotion]);

  const getTrailConfig = () => {
    if (deviceInfo.isMobile || deviceInfo.isLowEnd) {
      return {
        mainTrail: { width: 20, blur: '0px', opacity: 0.5 },
        secondaryTrail: null, // Skip secondary trail on mobile
        outerGlow: null, // Skip outer glow on mobile
      };
    } else if (deviceInfo.isTablet) {
      return {
        mainTrail: { width: 30, blur: '0.1px', opacity: 0.6 },
        secondaryTrail: { width: 45, blur: '0.2px', opacity: 0.3 },
        outerGlow: null, // Skip outer glow on tablet
      };
    } else {
      return {
        mainTrail: { width: 40, blur: '0.2px', opacity: 0.7 },
        secondaryTrail: { width: 60, blur: '0.3px', opacity: 0.4 },
        outerGlow: { width: 80, blur: '0.4px', opacity: 0.2 },
      };
    }
  };

  const trailConfig = getTrailConfig();

  // Return empty div if reduced motion is preferred
  if (shouldReduceMotion || deviceInfo.prefersReducedMotion) {
    return <div className="absolute inset-0 pointer-events-none overflow-hidden" />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {asteroids.map((asteroid) => (
        <motion.div
          key={asteroid.id}
          className="absolute"
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)', // Force GPU acceleration
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
            repeatDelay: deviceInfo.isMobile ? 4 + Math.random() * 6 : 3 + Math.random() * 5,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {/* Simplified asteroid body */}
          <div
            className="bg-white rounded-full"
            style={{
              width: `${asteroid.size}px`,
              height: `${asteroid.size}px`,
              // Simplified shadow for performance
              boxShadow: deviceInfo.isMobile ? 
                `0 0 ${asteroid.size * 2}px rgba(255, 255, 255, 0.8)` :
                `0 0 ${asteroid.size * 3}px rgba(255, 255, 255, 0.9), 0 0 ${asteroid.size * 6}px rgba(255, 159, 229, 0.3)`,
            }}
          />
          
          {/* Optimized trailing effect */}
          <div
            className="absolute top-0 left-0"
            style={{
              width: `${asteroid.size * trailConfig.mainTrail.width}px`,
              height: `${asteroid.size * 0.6}px`,
              background: deviceInfo.isMobile ? 
                'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)' :
                'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 20%, rgba(255,159,229,0.4) 50%, rgba(255,159,229,0.2) 80%, transparent 100%)',
              transform: 'rotate(-165deg) translateX(10%) translateY(-50%)',
              filter: `blur(${trailConfig.mainTrail.blur})`,
              borderRadius: '50px',
              opacity: trailConfig.mainTrail.opacity,
            }}
          />
          
          {/* Secondary trail - only on desktop */}
          {trailConfig.secondaryTrail && (
            <div
              className="absolute top-0 left-0"
              style={{
                width: `${asteroid.size * trailConfig.secondaryTrail.width}px`,
                height: `${asteroid.size * 0.4}px`,
                background: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,159,229,0.3) 30%, rgba(255,159,229,0.1) 60%, transparent 100%)',
                transform: 'rotate(-165deg) translateX(5%) translateY(-50%)',
                filter: `blur(${trailConfig.secondaryTrail.blur})`,
                borderRadius: '50px',
                opacity: trailConfig.secondaryTrail.opacity,
              }}
            />
          )}
          
          {/* Outer glow - only on high-end desktop */}
          {trailConfig.outerGlow && (
            <div
              className="absolute top-0 left-0"
              style={{
                width: `${asteroid.size * trailConfig.outerGlow.width}px`,
                height: `${asteroid.size * 0.3}px`,
                background: 'linear-gradient(90deg, rgba(255,159,229,0.2) 0%, rgba(255,159,229,0.1) 40%, transparent 100%)',
                transform: 'rotate(-165deg) translateY(-50%)',
                filter: `blur(${trailConfig.outerGlow.blur})`,
                borderRadius: '50px',
                opacity: trailConfig.outerGlow.opacity,
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
    className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center mb-4 sm:mb-6 leading-tight tracking-tight px-4"
    style={{ fontSize: 'clamp(1.875rem, 4vw, 3.5rem)' }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.0, duration: 0.8 }}
  >
    Software That Drives Revenue,
    <br />
    <div className="relative inline-block">
    Not Just {" "}
      <span className="text-white relative">
        Features
        <motion.div 
          className="absolute top-1/2 left-0 w-full h-[0.15em] bg-primary-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.4 }}
        />
      </span>
    </div>
  </motion.h1>
);

const Subheadline: React.FC = () => (
  <motion.p
    className="text-base sm:text-lg lg:text-xl text-gray-400 text-center max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.6 }}
  >
    Join 100+ companies that increased revenue 40%+ with business-first development that delivers measurable growth in 90 days or less.
  </motion.p>
);

const CTAButtons: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
    >
      <motion.button
        className="relative px-4 sm:px-5 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto max-w-xs overflow-hidden group"
        style={{
          background: 'rgba(255, 164, 0, 0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 164, 0, 0.3)',
          boxShadow: '0 8px 32px rgba(255, 164, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        }}
        whileHover={shouldReduceMotion ? {} : { 
          scale: 1.05,
        }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Liquid glass background overlay */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(45deg, rgba(255, 164, 0, 0.1) 0%, rgba(234, 246, 255, 0.05) 50%, rgba(255, 164, 0, 0.1) 100%)',
            opacity: 0,
          }}
          whileHover={shouldReduceMotion ? {} : {
            opacity: 1,
            background: [
              'linear-gradient(45deg, rgba(255, 164, 0, 0.1) 0%, rgba(234, 246, 255, 0.05) 50%, rgba(255, 164, 0, 0.1) 100%)',
              'linear-gradient(225deg, rgba(255, 164, 0, 0.2) 0%, rgba(234, 246, 255, 0.1) 50%, rgba(255, 164, 0, 0.15) 100%)',
              'linear-gradient(45deg, rgba(255, 164, 0, 0.1) 0%, rgba(234, 246, 255, 0.05) 50%, rgba(255, 164, 0, 0.1) 100%)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Liquid light reflection */}
        <motion.div
          className="absolute top-0 left-[-100%] w-full h-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
            transform: 'skewX(-20deg)',
          }}
          whileHover={shouldReduceMotion ? {} : {
            left: '100%',
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Button content */}
        <span className="relative z-10 text-white font-medium">Let's Talk</span>
        
        {/* Glass edge highlight */}
        <div 
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 164, 0, 0.1) 100%)',
            pointerEvents: 'none',
          }}
        />
      </motion.button>
    </motion.div>
  );
};

const TrustIndicator: React.FC = () => (
  <motion.div
    className="text-center px-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.6, duration: 0.4 }}
  >
    <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">Trusted by 100+ fast-growing companies worldwide</p>
    <p className="text-primary-400 text-xs">⚡ Free audit includes growth roadmap (normally $2,500)</p>
  </motion.div>
);

// Single Central Light Component
const CentralLight: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 -top-1/2">
      {/* Main central light - coming from front */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      >
        <motion.div
          style={{
            width: '400px',
            height: '2000px', // Made much taller
            background: 'radial-gradient(ellipse, rgba(255, 164, 0, 0.35) 0%, rgba(255, 164, 0, 0.25) 20%, rgba(255, 164, 0, 0.15) 40%, rgba(234, 246, 255, 0.12) 60%, rgba(234, 246, 255, 0.06) 80%, transparent 95%)',
            filter: 'blur(50px)',
            borderRadius: '50%',
            transform: 'translateZ(50px)', // Bring closer to front
          }}
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.15, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Additional front layer for more intensity */}
        <motion.div
          style={{
            width: '300px',
            height: '300px', // Tall inner glow
            background: 'radial-gradient(ellipse, rgba(255, 164, 0, 0.4) 0%, rgba(255, 164, 0, 0.2) 30%, rgba(234, 246, 255, 0.1) 60%, transparent 85%)',
            filter: 'blur(30px)',
            borderRadius: '50%',
            position: 'absolute',
            transform: 'translateZ(100px)', // Even closer to front
          }}
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

// Main Hero Component
const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Delay StarField loading to improve initial page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="hero" className="relative min-h-screen flex flex-col bg-gradient-to-br from-background-primary via-background-secondary to-background-primary overflow-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* Single Central Light */}
      <CentralLight />
      
      {/* Background StarField - Lazy loaded */}
      {isVisible && !shouldReduceMotion && (
        <React.Suspense fallback={null}>
          <LazyStarField />
        </React.Suspense>
      )}
      
      {/* Shooting Stars */}
      <ShootingStars />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-8">
            {/* Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <AnnouncementBadge />
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MainHeadline />
            </motion.div>

            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Subheadline />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center"
            >
              <CTAButtons />
            </motion.div>

            {/* Trust Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center"
            >
              <TrustIndicator />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 