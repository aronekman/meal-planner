import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
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
        background: '#ffffff',
        foreground: '#0f172a',
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#94a3b8',
        primary: {
          DEFAULT: '#0F172A',
          foreground: '#f8fafc'
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a'
        },
        destructive: {
          DEFAULT: '#ff0000',
          foreground: '#f8fafc'
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b'
        },
        accent: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a'
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#0f172a'
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#0f172a'
        }
      },
      borderRadius: {
        lg: `0.5rem`,
        md: `calc(0.5rem - 2px)`,
        sm: 'calc(0.5rem - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;
