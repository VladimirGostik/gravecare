module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // Remove or update the darkMode setting as needed
  // darkMode: 'media', // or 'class' or remove entirely
  theme: {
    extend: {
      colors: {
        customDark: '#06072D',  // Custom color
        customPurple: 'rgb(101, 85, 143)', 
        customPurpleNavbar: 'rgb(177, 166, 207)',
        customSideBar: 'rgb(230, 215, 235)',  // Lighter version
        backroundPurple: 'rgb(131, 107, 194)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // Remove the line-clamp plugin, as it's included by default
    // If you have other plugins, include them here
  ],
};
