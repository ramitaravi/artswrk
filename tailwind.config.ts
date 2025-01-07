import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: '#191919',
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#808080',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333',
          800: '#1f1f1f',
          900: '#191919',
        },
        
        // Artist Gradient Colors
        artist: {
          start: '#ec008c',
          end: '#ff7171',
        },
        
        // Business Gradient Colors
        business: {
          start: '#FFBC5D',
          end: '#F25722',
        },

        // Link Colors (based on artist gradient for brand consistency)
        link: {
          DEFAULT: '#ec008c',
          hover: '#d1007d',
          visited: '#cc0077',
        },

        // Status Colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },

        // Modern Grayscale
        gray: {
          50: '#F9FAFB',  // Background, hover states
          100: '#F3F4F6', // Cards, subtle backgrounds
          200: '#E5E7EB', // Borders, dividers
          300: '#D1D5DB', // Disabled states
          400: '#9CA3AF', // Placeholder text
          500: '#6B7280', // Secondary text
          600: '#4B5563', // Body text
          700: '#374151', // Strong text
          800: '#1F2937', // Headings
          900: '#111827', // Extra strong text
        },
      },
      fontSize: {
        // Display/Heading Text (Poppins)
        'h1': ['48px', { lineHeight: '1.4', fontWeight: '600' }],
        'h2': ['36px', { lineHeight: '1.4', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['22px', { lineHeight: '1.4', fontWeight: '600' }],
        'h5': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        // Body Text (Inter)
        'body-lg': ['16px', { lineHeight: '1.4', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
        'help': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      backgroundImage: {
        'artist-gradient': 'linear-gradient(to right, #ec008c, #ff7171)',
        'business-gradient': 'linear-gradient(to right, #FFBC5D, #F25722)',
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};

export default config;
