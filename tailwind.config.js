module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  // purge: { //ENABLE TO TEST LOCALLY
  //   enabled: true,
  //   content: ['./public/**/*.html', './src/**/*.html', './src/**/*.vue',],
  // },
  purge: ['./public/**/*.html',
  './src/**/*.vue'],
  theme: {
    extend: {
      screens: {
        'xs': "300px",
        '2xl': '1500px',
      },
      height: {
        'vhxs': '18rem',
        'vhsm': '24rem',
        'vhmd': '30rem',
        'vhxl': '38rem'
      }
    },
    fontFamily: {
      'sans': ['Lato'],
    },
  },
  variants: {
    stroke: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
}

