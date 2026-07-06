import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Menu, X} from 'lucide-react';
import { useTranslate } from '../i18n/react';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslate();

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isHomePage = pathname === '/' || pathname === '/es' || pathname === '/es/';
  const homeHref = isHomePage ? '#hero' : (pathname.startsWith('/es') ? '/es' : '/');

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    }, 16);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const navItems = [
    { name: t.nav.services, href: '#services' },
    { name: t.nav.caseStudies, href: '#case-studies' },
    { name: t.nav.process, href: '#process' },
    { name: t.nav.testimonials, href: '#testimonials' },
    { name: t.nav.pricing, href: '#pricing' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <motion.nav
      initial={shouldReduceMotion ? {} : { y: -100 }}
      animate={shouldReduceMotion ? {} : { y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-3xl shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-8 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <a href={homeHref} className="text-xl font-bold text-white hover:text-primary-400 transition-colors duration-200">ORION</a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-primary-400 transition-colors duration-200 font-medium"
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Language Switcher + CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <motion.a
              href="#contact"
              className="relative px-3 py-1 rounded-xl font-semibold transition-all duration-300 flex items-center overflow-hidden group"
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
              transition={{ duration: 0.1, ease: "easeOut" }}
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
              <div className="relative z-10 flex items-center space-x-2">
                
                <span className="text-white font-medium">{t.nav.joinToday}</span>
              </div>
              
              {/* Glass edge highlight */}
              <div 
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 164, 0, 0.1) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMobileMenu}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-background-primary/80 backdrop-blur-3xl border-t border-white/20 shadow-2xl"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block text-white/80 hover:text-primary-400 transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default React.memo(Navigation); 