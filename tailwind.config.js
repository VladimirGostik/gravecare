module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // alebo 'media' alebo 'class'
  theme: {
    extend: {
      colors: {
        customDark: '#06072D',  // Vlastná farba
        customPurple: 'rgb(101, 85, 143)', 
        customPurpleNavbar: 'rgb(177, 166, 207)',
        customSideBar: 'rgb(230, 215, 235)',  // Svetlejšia verzia
        backroundPurple: 'rgb(131, 107, 194)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
