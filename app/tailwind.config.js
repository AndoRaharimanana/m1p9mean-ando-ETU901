module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      }      
    },
  },
  plugins: [require('flowbite/plugin'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')],
}
