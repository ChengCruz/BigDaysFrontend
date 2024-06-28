module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        weddingGold: '#DAA520',
        weddingGoldDark: '#b8860b',
        weddingPink: '#FFC0CB',
        weddingWhite: '#FFF8DC',
      },
      fontFamily: {
        script: ['Great Vibes', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
