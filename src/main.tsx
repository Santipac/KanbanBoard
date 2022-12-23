import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { store } from './store';
import theme from './theme';
import '@fontsource/inter';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeProvider>
          <AppRouter />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);
