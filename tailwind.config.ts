import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        racket: {
          // Primary brand colors (CORRECT from Base44)
          red: '#ec1f27',         // Primary brand - buttons, CTAs, accents
          black: '#030707',       // Headlines, primary text
          charcoal: '#1a1a1a',    // Dark backgrounds
          gray: '#6b7280',        // Secondary text
          lightgray: '#f3f4f6',   // Subtle backgrounds
          white: '#ffffff',       // Pure white
          // Accent colors
          green: '#10b981',       // Member benefits, success states
          orange: '#f97316',      // Alerts, wizard features
          blue: '#3b82f6',        // Information, tooltips
        },
      },
      fontFamily: {
        headline: ['var(--font-poppins)', 'Poppins', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        label: ['var(--font-poppins)', 'Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.1', fontWeight: '800' }],
        'headline-lg': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'headline': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-sm': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['1.25rem', { lineHeight: '1.7' }],
        'body': ['1.125rem', { lineHeight: '1.75' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
