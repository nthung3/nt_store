/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,jsx,ts,tsx}',
        './core/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        fontFamily: {
            inter: ['Inter'],
        },
        extend: {
            colors: {
                primary: '#F54748',
                primary1: '#FEF4F4',
                secondary: '#FF8A01',
                textPrimary: '#021A49',
                textSecondary: '#FDC55E',
                textGray: '#898787',
                textLightGray: '#D5D1D1',
            },
        },
    },
    plugins: [
        require('@headlessui/tailwindcss'),

        // Or with a custom prefix:
        require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    ],
};
