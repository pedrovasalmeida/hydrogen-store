/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '420px',
      md: '768px',
      xl: '1280px',
      desktop: '1919px',
    },
    flex: {
      16: '0 0 16%',
      'a-quarter': '0 0 25%',
      33: '0 0 33.33%',
      half: '0 0 50%',
      'more-than-half': '0 0 66%',
      full: '1',
    },
    maxWidth: {
      16: '16%',
      'a-quarter': '25%',
      33: '33.33%',
      '1/2': '50%',
      'more-than-half': '66%',
      full: '100%',
    },
    fontFamily: {
      site: ['"Nunito Sans"'],
    },
    extend: {},
    plugins: [require('@tailwindcss/typography')],
  },
};
