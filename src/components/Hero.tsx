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
    </section>
  );
};

export default Hero; 