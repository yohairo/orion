/**
 * ORION Theme Utilities
 * Helper functions and utilities for implementing the ORION theme
 */

import orionTheme from './theme.config.js';

// Theme accessor helper
export const theme = orionTheme;

// Color utilities
export const colors = {
  // Get color by path (e.g., 'primary.600', 'background.card')
  get: (path) => {
    return path.split('.').reduce((obj, key) => obj?.[key], theme.colors);
  },
  
  // Primary brand colors
  primary: theme.colors.primary,
  secondary: theme.colors.secondary,
  background: theme.colors.background,
  text: theme.colors.text,
  border: theme.colors.border,
  status: theme.colors.status,
  
  // Gradient generators
  gradient: {
    primary: `background: ${theme.colors.gradients.primary}`,
    secondary: `background: ${theme.colors.gradients.secondary}`,
    accent: `background: ${theme.colors.gradients.accent}`,
    mesh: `background: ${theme.colors.gradients.mesh}`,
  }
};

// Typography utilities
export const typography = {
  // Font family helpers
  font: {
    sans: theme.typography.fontFamily.sans.join(', '),
    serif: theme.typography.fontFamily.serif.join(', '),
    mono: theme.typography.fontFamily.mono.join(', '),
  },
  
  // Heading styles
  heading: (level) => theme.typography.headings[`h${level}`],
  
  // Font size with line height
  text: (size) => {
    const [fontSize, { lineHeight }] = theme.typography.fontSize[size];
    return { fontSize, lineHeight };
  },
  
  // Weight helper
  weight: (weight) => theme.typography.fontWeight[weight],
};

// Spacing utilities
export const spacing = {
  get: (value) => theme.spacing[value],
  
  // Common spacing patterns
  padding: {
    sm: theme.spacing[2],
    md: theme.spacing[4],
    lg: theme.spacing[6],
    xl: theme.spacing[8],
  },
  
  margin: {
    sm: theme.spacing[2],
    md: theme.spacing[4],
    lg: theme.spacing[6],
    xl: theme.spacing[8],
  },
  
  gap: {
    sm: theme.spacing[2],
    md: theme.spacing[4],
    lg: theme.spacing[6],
    xl: theme.spacing[8],
  }
};

// Component style generators
export const components = {
  // Button component styles
  button: (variant = 'primary', size = 'md') => {
    const base = theme.components.button.base;
    const variantStyles = theme.components.button.variants[variant];
    const sizeStyles = theme.components.button.sizes[size];
    
    return {
      ...base,
      ...variantStyles,
      ...sizeStyles,
    };
  },
  
  // Card component styles
  card: (variant = 'default') => {
    const base = theme.components.card.base;
    const variantStyles = theme.components.card.variants[variant];
    
    return {
      ...base,
      ...variantStyles,
    };
  },
  
  // Input component styles
  input: (state = 'default') => {
    const base = theme.components.input.base;
    const stateStyles = state !== 'default' ? theme.components.input.states[state] : {};
    
    return {
      ...base,
      ...stateStyles,
    };
  },
  
  // Navigation styles
  navigation: (variant = 'transparent') => {
    const base = theme.components.navigation.base;
    const variantStyles = theme.components.navigation.variants[variant];
    
    return {
      ...base,
      ...variantStyles,
    };
  },
  
  // Section styles
  section: (variant = 'default') => {
    const base = theme.components.section.base;
    const variantStyles = theme.components.section.variants[variant];
    
    return {
      ...base,
      ...variantStyles,
    };
  }
};

// Animation utilities
export const animations = {
  duration: theme.animations.duration,
  easing: theme.animations.easing,
  
  // Transition helpers
  transition: (property = 'all', duration = '300', easing = 'out') => {
    return `${property} ${theme.animations.duration[duration]} ${theme.animations.easing[easing]}`;
  },
  
  // Common animation presets
  fadeIn: {
    opacity: 0,
    animation: 'fadeIn 0.3s ease-out forwards',
  },
  
  slideUp: {
    transform: 'translateY(20px)',
    opacity: 0,
    animation: 'slideUp 0.3s ease-out forwards',
  },
  
  hover: {
    transform: 'translateY(-2px)',
    transition: animations.transition('transform', '200'),
  },
  
  glow: (color = colors.primary[400]) => ({
    boxShadow: `0 0 20px ${color}`,
    transition: animations.transition('box-shadow', '300'),
  }),
};

// Responsive utilities
export const responsive = {
  breakpoints: theme.screens,
  
  // Media query helpers
  up: (breakpoint) => `@media (min-width: ${theme.screens[breakpoint]})`,
  down: (breakpoint) => `@media (max-width: ${theme.screens[breakpoint]})`,
  only: (breakpoint) => {
    const breakpoints = Object.keys(theme.screens);
    const currentIndex = breakpoints.indexOf(breakpoint);
    const nextBreakpoint = breakpoints[currentIndex + 1];
    
    if (nextBreakpoint) {
      return `@media (min-width: ${theme.screens[breakpoint]}) and (max-width: ${theme.screens[nextBreakpoint]})`;
    }
    return `@media (min-width: ${theme.screens[breakpoint]})`;
  },
  
  // Container utilities
  container: (size = 'xl') => ({
    maxWidth: theme.layout.container.maxWidth[size],
    margin: '0 auto',
    padding: `0 ${theme.layout.container.padding.DEFAULT}`,
    
    [responsive.up('sm')]: {
      padding: `0 ${theme.layout.container.padding.sm}`,
    },
    
    [responsive.up('lg')]: {
      padding: `0 ${theme.layout.container.padding.lg}`,
    },
  }),
};

// CSS-in-JS style generators
export const styles = {
  // Glass morphism effect
  glass: (opacity = 0.8, blur = 12) => ({
    backgroundColor: `rgba(31, 31, 35, ${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    border: `1px solid ${colors.border.primary}`,
  }),
  
  // Gradient text
  gradientText: (gradient = colors.gradient.primary) => ({
    background: gradient,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  }),
  
  // Glow effects
  glow: (color = colors.primary[400], intensity = 0.4) => ({
    boxShadow: `0 0 20px rgba(${color}, ${intensity})`,
  }),
  
  // Floating animation
  float: {
    animation: 'float 6s ease-in-out infinite',
    '@keyframes float': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
    },
  },
  
  // Pulse animation
  pulse: {
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    '@keyframes pulse': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 },
    },
  },
  
  // Gradient background
  gradientBg: (gradient = 'primary') => ({
    background: theme.colors.gradients[gradient],
  }),
  
  // Focus styles
  focus: {
    outline: 'none',
    borderColor: colors.border.focus,
    boxShadow: `0 0 0 3px rgba(192, 132, 252, 0.1)`,
  },
};

// Layout utilities
export const layout = {
  // Flexbox utilities
  flex: {
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    between: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    
    col: {
      display: 'flex',
      flexDirection: 'column',
    },
    
    colCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  
  // Grid utilities
  grid: {
    auto: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: theme.layout.grid.gap.md,
    },
    
    cols: (count) => ({
      display: 'grid',
      gridTemplateColumns: theme.layout.grid.cols[count],
      gap: theme.layout.grid.gap.md,
    }),
    
    responsive: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: theme.layout.grid.gap.sm,
      
      [responsive.up('md')]: {
        gridTemplateColumns: theme.layout.grid.cols[2],
        gap: theme.layout.grid.gap.md,
      },
      
      [responsive.up('lg')]: {
        gridTemplateColumns: theme.layout.grid.cols[3],
        gap: theme.layout.grid.gap.lg,
      },
    },
  },
  
  // Position utilities
  position: {
    absolute: {
      position: 'absolute',
    },
    
    fixed: {
      position: 'fixed',
    },
    
    relative: {
      position: 'relative',
    },
    
    center: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
};

// Brand utilities
export const brand = {
  colors: theme.brand.logo,
  voice: theme.brand.voice,
  imagery: theme.brand.imagery,
  
  // Logo styles
  logo: {
    primary: {
      color: theme.brand.logo.primary,
      fontWeight: theme.typography.fontWeight.bold,
      fontSize: theme.typography.fontSize.xl[0],
    },
    
    accent: {
      color: theme.brand.logo.secondary,
      fontWeight: theme.typography.fontWeight.bold,
      fontSize: theme.typography.fontSize.xl[0],
    },
  },
};

// Export all utilities
export const orionUtils = {
  colors,
  typography,
  spacing,
  components,
  animations,
  responsive,
  styles,
  layout,
  brand,
  theme,
};

export default orionUtils; 