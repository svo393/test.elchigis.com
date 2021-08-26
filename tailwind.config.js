/* eslint-disable @typescript-eslint/no-var-requires */
let colors = require('tailwindcss/colors')
let plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  purge: ['{pages,components}/**/*.{js,ts,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: { sans: ['Raleway'] },
    screens: {
      '2xl': { max: '1535px' },
      'xl': { max: '1279px' },
      'lg': { max: '1054px' },
      'md': { max: '767px' },
      'sm': { max: '639px' },
      'xs': { max: '452px' },
    },
    extend: {
      height: () => ({
        screen: 'calc(var(--vh) * 100)',
      }),
      minHeight: () => ({
        screen: 'calc(var(--vh) * 100)',
      }),
      zIndex: {
        '-10': -10,
      },
      spacing: { 88: '22rem', vw: '100vw' },
      borderRadius: () => ({
        DEFAULT: '1.25rem',
      }),
    },
    colors: () => ({
      'gray': colors.gray,
      'red': colors.red,
      'blue': colors.blue,
      'primary-dark': '#2d2d2f',
      'primary-body': '#727280',
      'secondary-white': '#ffffff',
      'secondary-blue': '#f0f4fb',
      'secondary-menu-blue': '#AEC2EA',
      'secondary-grey': '#8d8d8e',
      'secondary-very-light-grey': '#f8f8f8',
      'accent-blue': '#2967ff',
      'accent-pink': '#ff2d87',
      'accent-light-pink': '#FF7CB4',
    }),
    placeholderColor: { 'primary-body': '#727280' },
  },
  // variants: {},
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    plugin(({ addUtilities, theme }) => {
      let newUtilities = Object.entries(theme('spacing')).reduce(
        (acc, [k, v]) => {
          if (['/', 'px'].some((x) => k.includes(x))) return acc
          acc[`.grid-auto-${k}`] = {
            'grid-template-columns': `repeat(auto-fill, minmax(${v}, 1fr))`,
          }
          return acc
        },
        {}
      )

      addUtilities(newUtilities, ['responsive'])
    }),
  ],
}
