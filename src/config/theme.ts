import { extendTheme } from "native-base";

export const THEME = extendTheme({
    colors: {
        text: {

        },
        background: {
            
        },
        button: {

        },
        primary: {
            100: '#F9D0D3',
            200: '#F3A0A6',
            300: '#EE717A',
            400: '#E8414D',
            500: '#E21221',
            600: '#B50E1A',
            700: '#880B14',
            800: '#5A070D',
            900: '#2D0407'
        },
        white: '#FFFFFF',
        gray: {
            100: '#E6E6E6',
            200: '#CECECE',
            300: '#B5B5B5',
            400: '#9C9C9C',
            500: '#848484',
            600: '#6B6B6B',
            700: '#525252',
            800: '#3A3A3A',
            900: '#212121'
        }
    },
    fonts: {
        heading: 'Urbanist_700Bold',
        body: 'Urbanist_400Regular',
        mono: 'Urbanist_600SemiBold',
    },
})