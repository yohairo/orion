# ORION Theme System

A comprehensive, modern theme system based on the ORION project's professional design aesthetic. This theme captures the dark, purple-accented design with clean typography and business-focused styling.

## 🎨 Theme Overview

The ORION theme is built for modern business applications with:
- **Dark aesthetic** with professional contrast
- **Purple brand colors** (primary: #9333ea, accent: #c084fc)
- **Clean typography** using Inter font family
- **Glass morphism effects** with backdrop blur
- **Responsive design** system
- **Animation presets** for smooth interactions

## 📦 Installation & Setup

```javascript
// Import the theme and utilities
import orionTheme, { orionUtils } from './theme.config.js';
import { colors, typography, components } from './theme.utils.js';

// Use in your application
const App = () => {
  return (
    <div style={{
      backgroundColor: colors.background.primary,
      color: colors.text.primary,
      fontFamily: typography.font.sans
    }}>
      {/* Your app content */}
    </div>
  );
};
```

## 🎯 Core Features

### Color System
The theme includes a comprehensive color palette:

```javascript
// Primary brand colors (purple scale)
colors.primary[50]   // #faf5ff (lightest)
colors.primary[400]  // #c084fc (main accent)
colors.primary[600]  // #9333ea (primary brand)
colors.primary[950]  // #3b0764 (darkest)

// Background colors
colors.background.primary    // #09090b (main dark)
colors.background.secondary  // #18181b (zinc-950)
colors.background.card       // #1f1f23 (card background)

// Text colors
colors.text.primary    // #ffffff (main text)
colors.text.secondary  // #a1a1aa (muted text)
colors.text.muted      // #71717a (subtle text)
```

### Typography Scale
Responsive typography with fluid scaling:

```javascript
// Heading styles
typography.heading(1)  // Large hero headings
typography.heading(2)  // Section headings
typography.heading(3)  // Subsection headings

// Text utilities
typography.text('lg')    // { fontSize: '1.125rem', lineHeight: '1.75rem' }
typography.weight('bold') // "700"
typography.font.sans     // "Inter, system-ui, sans-serif"
```

### Component Styles
Pre-built component styles for common UI elements:

```javascript
// Button variants
components.button('primary', 'lg')   // Primary large button
components.button('secondary', 'md') // Secondary medium button
components.button('outline', 'sm')   // Outline small button

// Card variants
components.card('default')  // Standard card
components.card('elevated') // Card with shadow
components.card('featured') // Card with purple accent
```

## 🚀 Usage Examples

### React Component Example

```jsx
import React from 'react';
import { colors, components, typography, styles } from './theme.utils.js';

const HeroSection = () => {
  const heroStyles = {
    minHeight: '100vh',
    background: colors.background.primary,
    ...styles.flex.center,
    flexDirection: 'column',
    textAlign: 'center',
    padding: '0 1rem'
  };

  const headlineStyles = {
    ...typography.heading(1),
    color: colors.text.primary,
    marginBottom: '1.5rem',
    ...styles.gradientText()
  };

  const buttonStyles = {
    ...components.button('primary', 'lg'),
    marginTop: '2rem'
  };

  return (
    <section style={heroStyles}>
      <h1 style={headlineStyles}>
        Software That Drives Revenue
      </h1>
      <p style={{ 
        ...typography.text('lg'), 
        color: colors.text.secondary,
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        Join 100+ companies that increased revenue 40%+ with business-first development
      </p>
      <button style={buttonStyles}>
        Get Your Free Growth Audit
      </button>
    </section>
  );
};
```

### CSS-in-JS with Styled Components

```jsx
import styled from 'styled-components';
import { colors, typography, responsive, styles } from './theme.utils.js';

const Card = styled.div`
  ${styles.glass(0.8, 12)}
  padding: ${spacing.get(6)};
  border-radius: ${theme.borderRadius['2xl']};
  transition: ${animations.transition('all', '300')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.boxShadow.purple};
  }

  ${responsive.up('md')} {
    padding: ${spacing.get(8)};
  }
`;

const Heading = styled.h2`
  ${typography.heading(2)}
  color: ${colors.text.primary};
  margin-bottom: ${spacing.get(4)};
  
  span {
    ${styles.gradientText(colors.gradient.primary)}
  }
`;

const Button = styled.button`
  ${components.button('primary', 'md')}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${styles.glow(colors.primary[400])};
  }
`;
```

### Tailwind CSS Integration

```javascript
// tailwind.config.js
import orionTheme from './theme.config.js';

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: orionTheme.colors.primary,
        background: orionTheme.colors.background,
        // ... other colors
      },
      fontFamily: {
        sans: orionTheme.typography.fontFamily.sans,
      },
      spacing: orionTheme.spacing,
      borderRadius: orionTheme.borderRadius,
      boxShadow: orionTheme.boxShadow,
      // ... other theme values
    }
  }
};
```

### Emotion/CSS-in-JS Example

```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors, typography, responsive, styles } from './theme.utils.js';

const heroSection = css`
  min-height: 100vh;
  background: ${colors.background.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 0 1rem;
`;

const glassmorphCard = css`
  ${styles.glass(0.8, 12)}
  padding: 2rem;
  border-radius: 1rem;
  margin: 1rem 0;
  
  ${responsive.up('md')} {
    padding: 3rem;
  }
`;

const gradientHeading = css`
  ${typography.heading(2)}
  ${styles.gradientText()}
  margin-bottom: 1rem;
`;

const Component = () => (
  <section css={heroSection}>
    <div css={glassmorphCard}>
      <h2 css={gradientHeading}>Beautiful Design</h2>
      <p>Content goes here...</p>
    </div>
  </section>
);
```

## 🎭 Customization

### Creating Theme Variants

```javascript
// Create a light theme variant
const lightTheme = {
  ...orionTheme,
  colors: {
    ...orionTheme.colors,
    background: {
      primary: "#ffffff",
      secondary: "#f8fafc",
      card: "#ffffff",
    },
    text: {
      primary: "#1a202c",
      secondary: "#4a5568",
      muted: "#718096",
    }
  }
};

// Create custom color palette
const customTheme = {
  ...orionTheme,
  colors: {
    ...orionTheme.colors,
    primary: {
      ...orionTheme.colors.primary,
      600: "#0066cc", // Custom blue primary
    }
  }
};
```

### Custom Component Styles

```javascript
// Extend component styles
const customComponents = {
  ...components,
  
  // Custom button variant
  button: (variant = 'primary', size = 'md') => {
    const base = components.button(variant, size);
    
    if (variant === 'custom') {
      return {
        ...base,
        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
      };
    }
    
    return base;
  },
  
  // Custom card with animation
  animatedCard: () => ({
    ...components.card('default'),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: theme.boxShadow.purple,
    }
  })
};
```

## 🎨 Design Tokens

### Spacing Scale
```
4px   8px   12px  16px  20px  24px  32px  40px  48px  64px  80px  96px
0.5   1     1.5   2     2.5   3     4     5     6     8     10    12
```

### Typography Scale
```
12px  14px  16px  18px  20px  24px  30px  36px  48px  60px  72px
xs    sm    base  lg    xl    2xl   3xl   4xl   5xl   6xl   7xl
```

### Border Radius Scale
```
2px   4px   6px   8px   12px  16px  24px  9999px
sm    base  md    lg    xl    2xl   3xl   full
```

## 🎯 Best Practices

### 1. Consistent Color Usage
```javascript
// ✅ Good - Use semantic color names
backgroundColor: colors.background.card
color: colors.text.primary

// ❌ Avoid - Direct hex values
backgroundColor: '#1f1f23'
color: '#ffffff'
```

### 2. Responsive Typography
```javascript
// ✅ Good - Use fluid typography
...typography.heading(2)  // Uses clamp() for responsive scaling

// ❌ Avoid - Fixed font sizes
fontSize: '2rem'
```

### 3. Component Composition
```javascript
// ✅ Good - Compose styles
const cardStyles = {
  ...components.card('featured'),
  ...styles.glass(),
  ...animations.fadeIn
};

// ❌ Avoid - Hardcoded styles
const cardStyles = {
  backgroundColor: 'rgba(31, 31, 35, 0.8)',
  border: '1px solid #3f3f46',
  // ... many hardcoded values
};
```

### 4. Theme Context
```jsx
// Create a theme context for React apps
import React, { createContext, useContext } from 'react';
import orionTheme from './theme.config.js';

const ThemeContext = createContext(orionTheme);

export const ThemeProvider = ({ children, theme = orionTheme }) => (
  <ThemeContext.Provider value={theme}>
    {children}
  </ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);

// Usage in components
const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <div style={{
      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary
    }}>
      Content
    </div>
  );
};
```

## 🌙 Dark/Light Mode Support

```javascript
// Theme mode switcher
const createThemeMode = (mode = 'dark') => {
  const baseTheme = orionTheme;
  
  if (mode === 'light') {
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: {
          primary: "#ffffff",
          secondary: "#f8fafc",
          card: "#ffffff",
        },
        text: {
          primary: "#1a202c",
          secondary: "#4a5568",
          muted: "#718096",
        },
        border: {
          primary: "#e2e8f0",
          secondary: "#cbd5e1",
        }
      }
    };
  }
  
  return baseTheme;
};

// Usage
const darkTheme = createThemeMode('dark');
const lightTheme = createThemeMode('light');
```

## 📱 Framework Integration Examples

### Next.js Integration
```jsx
// pages/_app.js
import { ThemeProvider } from 'styled-components';
import orionTheme from '../theme.config.js';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={orionTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Vue.js Integration
```javascript
// main.js
import { createApp } from 'vue';
import orionTheme from './theme.config.js';

const app = createApp(App);
app.config.globalProperties.$theme = orionTheme;
```

### Svelte Integration
```javascript
// theme.js (Svelte store)
import { writable } from 'svelte/store';
import orionTheme from './theme.config.js';

export const theme = writable(orionTheme);
```

## 🚀 Performance Tips

1. **Tree Shaking**: Import only needed utilities
```javascript
// ✅ Good
import { colors, typography } from './theme.utils.js';

// ❌ Avoid
import orionUtils from './theme.utils.js';
```

2. **CSS Custom Properties**: Convert to CSS variables for runtime switching
```css
:root {
  --color-primary-600: #9333ea;
  --color-background-primary: #09090b;
  --color-text-primary: #ffffff;
}
```

3. **Memoization**: Cache computed styles
```javascript
import { useMemo } from 'react';

const MyComponent = () => {
  const buttonStyles = useMemo(() => 
    components.button('primary', 'lg'), []
  );
  
  return <button style={buttonStyles}>Click me</button>;
};
```

## 📄 License

This theme system is based on the ORION project design and is available for use in your projects. Feel free to customize and extend it according to your needs.

---

**Built with ❤️ for modern, professional web applications** 