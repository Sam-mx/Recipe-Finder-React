import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#ffc107',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;