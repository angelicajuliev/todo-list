import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#e63946',
            contrastText: '#f1faee'
        },
        secondary: {
            main: '#283552',
            contrastText: '#f1faee'
        },
    },
});

const Palette: React.FC<any> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}

export { Palette };
