/**
 * ORION Theme Configuration
 * A modern, professional theme for business-focused applications
 * Based on dark aesthetics with amber primary and light blue secondary colors
 */

export const orionTheme = {
  // Brand Identity
  name: "ORION",
  version: "1.0.0",
  description: "Professional business-first development theme",

  // Color System
  colors: {
    // Primary Brand Colors - Amber system (#FFA400)
    primary: {
      50: "#fffbeb",
      100: "#fef3c7", 
      200: "#fde68a",
      300: "#fcd34d",
      400: "#FFA400", // Main primary color
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
      950: "#451a03"
    },

    // Secondary Brand Colors - Light blue system (#EAF6FF)
    secondary: {
      50: "#EAF6FF", // Main secondary color
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554"
    },

    // Background System - Dark gray based (#232528)
    background: {
      primary: "#232528",      // Main dark background
      secondary: "#1a1c1e",    // Darker variant
      tertiary: "#2a2d30",     // Lighter variant
      card: "#252a2d",         // Card backgrounds
      elevated: "#2d3236",     // Elevated surfaces
      overlay: "rgba(35, 37, 40, 0.9)", // Modal overlays
    },

    // Text Colors
    text: {
      primary: "#ffffff",      // Main text
      secondary: "#d1d5db",    // Light gray
      muted: "#9ca3af",        // Gray-400
      disabled: "#6b7280",     // Gray-500
      inverse: "#000000",      // For light backgrounds
      accent: "#FFA400",       // Primary amber for accent text
    },

    // Border Colors
    border: {
      primary: "#2a2d30",      // Variant of background
      secondary: "#232528",    // Main background color
      muted: "#2d3236",        // Subtle borders
      focus: "#FFA400",        // Primary amber for focus states
      accent: "#EAF6FF",       // Secondary light blue for accents
    },

    // Status Colors
    status: {
      success: {
        50: "#f0fdf4",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d"
      },
      warning: {
        50: "#fffbeb",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309"
      },
      error: {
        50: "#fef2f2",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c"
      },
      info: {
        50: "#EAF6FF", // Secondary light blue
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8"
      }
    },

    // Gradient Definitions - Using primary and secondary colors
    gradients: {
      primary: "linear-gradient(135deg, #FFA400 0%, #EAF6FF 100%)", // Primary to secondary
      secondary: "linear-gradient(135deg, #EAF6FF 0%, #FFA400 100%)", // Secondary to primary
      accent: "linear-gradient(135deg, #FFA400 0%, #232528 100%)", // Primary to background
      background: "radial-gradient(circle at 50% 50%, rgba(255, 164, 0, 0.1) 0%, transparent 50%)", // Primary radial
      mesh: "conic-gradient(from 230.29deg at 51.63% 52.16%, #FFA400 0deg, #EAF6FF 67.5deg, #232528 198.75deg, #FFA400 251.25deg, #EAF6FF 301.88deg, #232528 360deg)" // All theme colors
    }
  },

  // Typography System
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      serif: ["Georgia", "serif"],
      mono: ["JetBrains Mono", "Consolas", "monospace"]
    },

    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],      // 12px
      sm: ["0.875rem", { lineHeight: "1.25rem" }],  // 14px
      base: ["1rem", { lineHeight: "1.5rem" }],     // 16px
      lg: ["1.125rem", { lineHeight: "1.75rem" }],  // 18px
      xl: ["1.25rem", { lineHeight: "1.75rem" }],   // 20px
      "2xl": ["1.5rem", { lineHeight: "2rem" }],    // 24px
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
      "5xl": ["3rem", { lineHeight: "1" }],         // 48px
      "6xl": ["3.75rem", { lineHeight: "1" }],      // 60px
      "7xl": ["4.5rem", { lineHeight: "1" }],       // 72px
    },

    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900"
    },

    // Heading Styles
    headings: {
      h1: {
        fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
        fontWeight: "700",
        lineHeight: "0.9",
        letterSpacing: "-0.025em"
      },
      h2: {
        fontSize: "clamp(2rem, 4vw, 3.75rem)",
        fontWeight: "700",
        lineHeight: "1.1",
        letterSpacing: "-0.025em"
      },
      h3: {
        fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
        fontWeight: "600",
        lineHeight: "1.2"
      },
      h4: {
        fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
        fontWeight: "600",
        lineHeight: "1.3"
      }
    }
  },

  // Spacing System
  spacing: {
    px: "1px",
    0: "0",
    0.5: "0.125rem",  // 2px
    1: "0.25rem",     // 4px
    1.5: "0.375rem",  // 6px
    2: "0.5rem",      // 8px
    2.5: "0.625rem",  // 10px
    3: "0.75rem",     // 12px
    3.5: "0.875rem",  // 14px
    4: "1rem",        // 16px
    5: "1.25rem",     // 20px
    6: "1.5rem",      // 24px
    7: "1.75rem",     // 28px
    8: "2rem",        // 32px
    9: "2.25rem",     // 36px
    10: "2.5rem",     // 40px
    11: "2.75rem",    // 44px
    12: "3rem",       // 48px
    14: "3.5rem",     // 56px
    16: "4rem",       // 64px
    20: "5rem",       // 80px
    24: "6rem",       // 96px
    28: "7rem",       // 112px
    32: "8rem",       // 128px
    36: "9rem",       // 144px
    40: "10rem",      // 160px
    44: "11rem",      // 176px
    48: "12rem",      // 192px
    52: "13rem",      // 208px
    56: "14rem",      // 224px
    60: "15rem",      // 240px
    64: "16rem",      // 256px
    72: "18rem",      // 288px
    80: "20rem",      // 320px
    96: "24rem"       // 384px
  },

  // Border Radius System
  borderRadius: {
    none: "0",
    sm: "0.125rem",   // 2px
    DEFAULT: "0.25rem", // 4px
    md: "0.375rem",   // 6px
    lg: "0.5rem",     // 8px
    xl: "0.75rem",    // 12px
    "2xl": "1rem",    // 16px
    "3xl": "1.5rem",  // 24px
    full: "9999px"
  },

  // Box Shadow System
  boxShadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    
    // Branded shadows
    pink: "0 20px 25px -5px rgba(255, 159, 229, 0.25), 0 10px 10px -5px rgba(255, 159, 229, 0.04)",
    blue: "0 20px 25px -5px rgba(43, 80, 170, 0.25), 0 10px 10px -5px rgba(43, 80, 170, 0.04)",
    glow: "0 0 20px rgba(255, 159, 229, 0.4)"
  },

  // Responsive Breakpoints
  screens: {
    xs: "475px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  },

  // Animation System
  animations: {
    duration: {
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1000: "1000ms"
    },
    
    easing: {
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      inOut: "cubic-bezier(0.4, 0, 0.2, 1)"
    },

    // Predefined animations
    keyframes: {
      fadeIn: "opacity 0.3s ease-out",
      slideUp: "transform 0.3s ease-out",
      slideDown: "transform 0.3s ease-out",
      scaleIn: "transform 0.2s ease-out",
      glow: "box-shadow 0.3s ease-out",
      float: "transform 6s ease-in-out infinite"
    }
  },

  // Component Styles
  components: {
    // Button Variants
    button: {
      base: {
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        fontWeight: "600",
        fontSize: "1rem",
        lineHeight: "1.5rem",
        transition: "all 0.2s ease-out",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem"
      },
      variants: {
        primary: {
          backgroundColor: "#ff9fe5",
          color: "#000000",
          border: "1px solid transparent",
          hover: {
            backgroundColor: "#ff858d",
            transform: "translateY(-2px)",
            boxShadow: "0 10px 25px -5px rgba(255, 159, 229, 0.4)"
          }
        },
        secondary: {
          backgroundColor: "transparent",
          color: "#d1d5db",
          border: "1px solid #3a3a3a",
          hover: {
            color: "#ffffff",
            borderColor: "#404040",
            backgroundColor: "#272727"
          }
        },
        outline: {
          backgroundColor: "transparent",
          color: "#2B50AA",
          border: "1px solid #2B50AA",
          hover: {
            backgroundColor: "#2B50AA",
            color: "#ffffff"
          }
        }
      },
      sizes: {
        sm: {
          padding: "0.5rem 1rem",
          fontSize: "0.875rem"
        },
        md: {
          padding: "0.75rem 1.5rem",
          fontSize: "1rem"
        },
        lg: {
          padding: "1rem 2rem",
          fontSize: "1.125rem"
        }
      }
    },

    // Card Styles
    card: {
      base: {
        backgroundColor: "rgba(47, 47, 47, 0.8)",
        border: "1px solid #3a3a3a",
        borderRadius: "1rem",
        padding: "1.5rem",
        backdropFilter: "blur(12px)",
        transition: "all 0.3s ease-out"
      },
      variants: {
        default: {
          hover: {
            borderColor: "#404040",
            transform: "translateY(-2px)",
            boxShadow: "0 10px 25px -5px rgba(39, 39, 39, 0.2)"
          }
        },
        elevated: {
          backgroundColor: "rgba(64, 64, 64, 0.9)",
          boxShadow: "0 4px 6px -1px rgba(39, 39, 39, 0.1)"
        },
        featured: {
          border: "1px solid rgba(255, 159, 229, 0.2)",
          backgroundImage: "linear-gradient(135deg, rgba(255, 159, 229, 0.1) 0%, transparent 50%)",
          hover: {
            borderColor: "rgba(255, 159, 229, 0.4)",
            boxShadow: "0 20px 25px -5px rgba(255, 159, 229, 0.1)"
          }
        }
      }
    },

    // Input Styles
    input: {
      base: {
        width: "100%",
        padding: "0.75rem 1rem",
        backgroundColor: "#272727",
        border: "1px solid #3a3a3a",
        borderRadius: "0.5rem",
        color: "#ffffff",
        fontSize: "1rem",
        transition: "all 0.2s ease-out",
        outline: "none"
      },
      states: {
        focus: {
          borderColor: "#ff9fe5",
          boxShadow: "0 0 0 3px rgba(255, 159, 229, 0.1)"
        },
        error: {
          borderColor: "#ff858d",
          boxShadow: "0 0 0 3px rgba(255, 133, 141, 0.1)"
        }
      }
    },

    // Navigation Styles
    navigation: {
      base: {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "50",
        transition: "all 0.3s ease-out"
      },
      variants: {
        transparent: {
          backgroundColor: "transparent"
        },
        solid: {
          backgroundColor: "rgba(39, 39, 39, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(58, 58, 58, 0.5)"
        }
      }
    },

    // Section Styles
    section: {
      base: {
        padding: "5rem 0 8rem 0"
      },
      variants: {
        hero: {
          minHeight: "100vh",
          display: "flex",
          alignItems: "center"
        },
        default: {
          padding: "5rem 0"
        },
        compact: {
          padding: "3rem 0"
        }
      }
    }
  },

  // Layout System
  layout: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem"
      },
      maxWidth: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px"
      }
    },
    
    grid: {
      cols: {
        1: "repeat(1, minmax(0, 1fr))",
        2: "repeat(2, minmax(0, 1fr))",
        3: "repeat(3, minmax(0, 1fr))",
        4: "repeat(4, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))"
      },
      gap: {
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem"
      }
    }
  },

  // Brand Guidelines
  brand: {
    logo: {
      primary: "#ffffff",
      secondary: "#ff9fe5",
      accent: "#2B50AA"
    },
    voice: {
      tone: "Professional, confident, results-driven",
      personality: "Modern, innovative, trustworthy",
      messaging: "Business-first development with guaranteed results"
    },
    imagery: {
      style: "Clean, modern, tech-focused",
      filters: "High contrast, pink and blue accent overlays",
      composition: "Geometric, structured, professional"
    }
  }
};

export default orionTheme; 