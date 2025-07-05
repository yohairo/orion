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

// Simple Shooting Stars Component - Safe version with trails
const ShootingStars: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render if reduced motion is preferred or not mounted
  if (shouldReduceMotion || !mounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
      {/* Shooting star 1 with trail */}
      <motion.div
        className="absolute"
        initial={{ x: -50, y: 100, opacity: 0 }}
        animate={{ 
          x: ["-50px", "100vw"], 
          y: ["100px", "80vh"], 
          opacity: [0, 1, 1, 0] 
        }}
        transition={{
          duration: 1,
          delay: 0.5,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "linear",
        }}
      >
        {/* Main star */}
        <div
          className="w-0.5 h-0.5 bg-white rounded-full"
          style={{
            boxShadow: '0 0 4px rgba(96, 165, 250, 1), 0 0 8px rgba(59, 130, 246, 0.9), 0 0 12px rgba(96, 165, 250, 0.6)',
          }}
        />
        
        {/* Trail particles */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${0.6 - (i * 0.04)}px`,
              height: `${0.6 - (i * 0.04)}px`,
              boxShadow: `0 0 ${2 - i * 0.1}px rgba(147, 197, 253, ${0.8 - i * 0.05}), 0 0 ${4 - i * 0.2}px rgba(96, 165, 250, ${0.8 - i * 0.02}), 0 0 ${6 - i * 0.3}px rgba(59, 130, 246, ${0.5 - i * 0.02})`,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [`${-i * 6}px`, `${-i * 6 - 50}px`],
              y: [`${-i * 2}px`, `${-i * 2 - 20}px`],
              opacity: [0, 0.6 - i * 0.05, 0],
            }}
                         transition={{
               duration: 1,
               delay: 0.5 + (i * 0.02),
               repeat: Infinity,
               repeatDelay: 8,
               ease: "linear",
             }}
          />
        ))}
      </motion.div>
      
      {/* Shooting star 2 with trail */}
      <motion.div
        className="absolute"
        initial={{ x: -50, y: 250, opacity: 0 }}
        animate={{ 
          x: ["-50px", "100vw"], 
          y: ["250px", "90vh"], 
          opacity: [0, 1, 1, 0] 
        }}
        transition={{
          duration: 1,
          delay: 4,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "linear",
        }}
      >
        {/* Main star */}
        <div
          className="w-0.5 h-0.5 bg-white rounded-full"
          style={{
            boxShadow: '0 0 4px rgba(96, 165, 250, 1), 0 0 8px rgba(59, 130, 246, 0.9), 0 0 12px rgba(96, 165, 250, 0.6)',
          }}
        />
        
        {/* Trail particles */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${0.6 - (i * 0.04)}px`,
              height: `${0.6 - (i * 0.04)}px`,
              boxShadow: `0 0 ${2 - i * 0.1}px rgba(147, 197, 253, ${0.8 - i * 0.05}), 0 0 ${4 - i * 0.2}px rgba(96, 165, 250, ${0.8 - i * 0.02}), 0 0 ${6 - i * 0.3}px rgba(59, 130, 246, ${0.5 - i * 0.02})`,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [`${-i * 6}px`, `${-i * 6 - 50}px`],
              y: [`${-i * 2}px`, `${-i * 2 - 20}px`],
              opacity: [0, 0.6 - i * 0.05, 0],
            }}
                         transition={{
               duration: 1,
               delay: 4 + (i * 0.02),
               repeat: Infinity,
               repeatDelay: 8,
               ease: "linear",
             }}
          />
        ))}
      </motion.div>
      
      {/* Shooting star 3 with trail */}
      <motion.div
        className="absolute"
        initial={{ x: -50, y: 180, opacity: 0 }}
        animate={{ 
          x: ["-50px", "100vw"], 
          y: ["180px", "70vh"], 
          opacity: [0, 1, 1, 0] 
        }}
        transition={{
          duration: 1.2,
          delay: 2,
          repeat: Infinity,
          repeatDelay: 10,
          ease: "linear",
        }}
      >
        {/* Main star */}
        <div
          className="w-0.5 h-0.5 bg-white rounded-full"
          style={{
            boxShadow: '0 0 4px rgba(96, 165, 250, 1), 0 0 8px rgba(59, 130, 246, 0.9), 0 0 12px rgba(96, 165, 250, 0.6)',
          }}
        />
        
        {/* Trail particles */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${0.5 - (i * 0.04)}px`,
              height: `${0.5 - (i * 0.04)}px`,
              boxShadow: `0 0 ${2 - i * 0.1}px rgba(147, 197, 253, ${0.7 - i * 0.05}), 0 0 ${4 - i * 0.2}px rgba(96, 165, 250, ${0.7 - i * 0.02}), 0 0 ${6 - i * 0.3}px rgba(59, 130, 246, ${0.4 - i * 0.02})`,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [`${-i * 6}px`, `${-i * 6 - 40}px`],
              y: [`${-i * 2}px`, `${-i * 2 - 15}px`],
              opacity: [0, 0.7 - i * 0.05, 0],
            }}
            transition={{
              duration: 1.2,
              delay: 2 + (i * 0.02),
              repeat: Infinity,
              repeatDelay: 10,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>
      
      {/* Shooting star 4 with trail */}
      <motion.div
        className="absolute"
        initial={{ x: -50, y: 320, opacity: 0 }}
        animate={{ 
          x: ["-50px", "100vw"], 
          y: ["320px", "95vh"], 
          opacity: [0, 1, 1, 0] 
        }}
        transition={{
          duration: 0.8,
          delay: 6,
          repeat: Infinity,
          repeatDelay: 12,
          ease: "linear",
        }}
      >
        {/* Main star */}
        <div
          className="w-0.5 h-0.5 bg-white rounded-full"
          style={{
            boxShadow: '0 0 4px rgba(96, 165, 250, 1), 0 0 8px rgba(59, 130, 246, 0.9), 0 0 12px rgba(96, 165, 250, 0.6)',
          }}
        />
        
        {/* Trail particles */}
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${0.4 - (i * 0.03)}px`,
              height: `${0.4 - (i * 0.03)}px`,
              boxShadow: `0 0 ${1.5 - i * 0.1}px rgba(147, 197, 253, ${0.6 - i * 0.05}), 0 0 ${3 - i * 0.2}px rgba(96, 165, 250, ${0.6 - i * 0.02}), 0 0 ${5 - i * 0.3}px rgba(59, 130, 246, ${0.3 - i * 0.02})`,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [`${-i * 5}px`, `${-i * 5 - 30}px`],
              y: [`${-i * 1.5}px`, `${-i * 1.5 - 12}px`],
              opacity: [0, 0.6 - i * 0.05, 0],
            }}
            transition={{
              duration: 0.8,
              delay: 6 + (i * 0.015),
              repeat: Infinity,
              repeatDelay: 12,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>
      
      {/* Shooting star 5 with trail - smaller, distant */}
      <motion.div
        className="absolute"
        initial={{ x: -30, y: 50, opacity: 0 }}
        animate={{ 
          x: ["-30px", "100vw"], 
          y: ["50px", "40vh"], 
          opacity: [0, 1, 1, 0] 
        }}
        transition={{
          duration: 1.5,
          delay: 8,
          repeat: Infinity,
          repeatDelay: 15,
          ease: "linear",
        }}
      >
        {/* Main star */}
        <div
          className="w-0.5 h-0.5 bg-white rounded-full"
          style={{
            boxShadow: '0 0 3px rgba(96, 165, 250, 0.8), 0 0 6px rgba(59, 130, 246, 0.7), 0 0 9px rgba(96, 165, 250, 0.4)',
          }}
        />
        
        {/* Trail particles */}
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${0.3 - (i * 0.03)}px`,
              height: `${0.3 - (i * 0.03)}px`,
              boxShadow: `0 0 ${1 - i * 0.1}px rgba(147, 197, 253, ${0.5 - i * 0.05}), 0 0 ${2 - i * 0.2}px rgba(96, 165, 250, ${0.5 - i * 0.02}), 0 0 ${3 - i * 0.3}px rgba(59, 130, 246, ${0.2 - i * 0.02})`,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [`${-i * 4}px`, `${-i * 4 - 25}px`],
              y: [`${-i * 1}px`, `${-i * 1 - 8}px`],
              opacity: [0, 0.5 - i * 0.05, 0],
            }}
            transition={{
              duration: 1.5,
              delay: 8 + (i * 0.02),
              repeat: Infinity,
              repeatDelay: 15,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>
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
          transition={{ delay: 1.4, duration: 0.6 }}
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
    transition={{ delay: 1.6, duration: 0.6 }}
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
            background: 'radial-gradient(ellipse, rgba(255, 164, 0, 0.6) 0%, rgba(255, 164, 0, 0.2) 30%, rgba(234, 246, 255, 0.1) 60%, transparent 85%)',
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
      
      {/* Shooting Stars - Simple version */}
      <ShootingStars />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-8">
            {/* Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
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
              transition={{ duration: 0.6, delay: 0.6 }}
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