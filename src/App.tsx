import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CountryList from './components/CountryList';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  spacing: 8, // Default is 8px spacing unit
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CountryList />
    </ThemeProvider>
  );
};

export default App;
