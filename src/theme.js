

import { createTheme } from "@mui/material/styles";


const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: '#0047bb'
        },
        warning: {
            main: '#ede939'
        },
        danger: {
            main: '#ff4042'
        },
        england: {
            main: '#15295e'
        },
        australia: {
            main: '#00843D'
        }
    },
    // typography: {
    //     fontFamily: 'BrandonText'
    // },
    // components :{
    //     MuiCssBaseline : {
    //         styleOverrides: `
    //         @font-face {
    //             font-family: 'BrandonText';
    //             font-style: normal;
    //             font-display: swap,
    //             font-weight: 300,
    //             src: local('BrandonText'), local('brandontext-regular'), url(${BrandonTextregular}) format('otf')
    //         }`
    //     }
    // }

})


export default theme