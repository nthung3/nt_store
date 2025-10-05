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
            borderWidth: {
                1: '1px',
            },
            borderColor: {
                color: 'rgba(0, 0, 0, 0.1)',
            },
            width: {
                400: '400px',
                760: '760px',
                780: '780px',
                800: '800px',
                1000: '1000px',
                1200: '1200px',
                1400: '1400px',
            },
            height: {
                80: '80px',
            },
            minHeight: {
                590: '590px',
            },
            fontSize: {
                14: '14px',
            },
            backgroundColor: {
                'main-bg': '#FAFBFB',
                'main-dark-bg': '#20232A',
                'secondary-dark-bg': '#33373E',
                'light-gray': '#F7F7F7',
                'half-transparent': 'rgba(0, 0, 0, 0.5)',
            },
        },
    },
    plugins: [],
};
