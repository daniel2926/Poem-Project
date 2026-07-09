/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Friendlier, cheerful palette: a warm blue primary, light-blue (sky)
        // secondary, and a soft green accent. `navy` is kept as a deep
        // text/support color so existing utilities keep working.
        brand: { DEFAULT: '#2563EB', dark: '#1D4ED8', light: '#3B82F6' }, // blue
        sky: { DEFAULT: '#38BDF8', soft: '#E0F2FE' }, // light blue
        mint: { DEFAULT: '#22C55E', soft: '#DCFCE7' }, // light green
        sun: { DEFAULT: '#FBBF24', soft: '#FEF3C7' }, // warm highlight
        navy: { DEFAULT: '#1E3A8A', dark: '#162c6b', light: '#2947a3' },
        // Warm off-white app background (replaces the cold gray-50).
        cream: '#F6F9FF',
      },
      borderRadius: {
        // Softer, more approachable corners.
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(37, 99, 235, 0.12)',
        card: '0 2px 12px -2px rgba(30, 58, 138, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
