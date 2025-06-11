import type { Config } from "tailwindcss";

export default {
  // darkMode: ["class"], // Removed as not specified in PRD designSystem, and .dark styles removed from index.css
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))'
        },
        // Direct mappings for PRD names if needed for utility classes like text-secondaryText
        surface: 'hsl(var(--card))', // PRD 'surface' is used for cards
        primaryText: 'hsl(var(--foreground))', // PRD 'primaryText' is the main foreground color
        secondaryText: 'hsl(var(--muted-foreground))', // PRD 'secondaryText' for less prominent text, mapped to muted-foreground
      },
      borderRadius: {
        lg: 'var(--radius)', // 0.5rem (8px) by default from CSS var
        md: 'calc(var(--radius) - 2px)', // 0.375rem (6px), Tailwind's default 'md'
        sm: 'calc(var(--radius) - 4px)'  // 0.25rem (4px), Tailwind's default 'sm'
      },
      fontFamily: {
        sans: ['var(--font-sans)'], // Uses the "Inter, system-ui, sans-serif" stack from --font-sans CSS variable
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)', // Standard Tailwind 'shadow-sm', PRD 'effects.shadows.default' is "shadow-sm"
        DEFAULT: '0 1px 2px 0 rgb(0 0 0 / 0.05)', // Makes 'shadow' class apply 'shadow-sm'
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // Standard Tailwind 'shadow-md'
        header: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // PRD 'effects.shadows.header' is "shadow-md", providing a 'shadow-header' utility
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
