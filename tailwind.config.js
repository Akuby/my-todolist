/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Pretendard']
      },
      colors: {
        'bg01': '#ffc3a0',
        'bg02' : '#ffafbd'
      },
    },
  },
  plugins: [],
}
