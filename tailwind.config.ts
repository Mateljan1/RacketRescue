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
          // Primary brand colors
          orange: '#FF6B35',      // Vibrant energy orange
          navy: '#1A2F3A',        // Deep professional navy
          slate: '#364958',       // Medium slate blue
          cream: '#FFF8F0',       // Warm cream background
          gray: '#8B9FA8',        // Soft gray for text
          // Accent colors
          green: '#52B788',       // Success/check green
          red: '#E63946',         // Urgency/CTA red
          white: '#FFFFFF',       // Pure white
          black: '#0D1B2A',       // Rich black
        },
      },
      fontFamily: {
        headline: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
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

