import React from 'react';
import { Container } from '@chakra-ui/react';
import { Board } from './components/app';
import { AppContainer, MenuMobile } from './components/app/ui';

export const App = () => {
  return (
    <AppContainer>
      <Container maxWidth="container.xl" px={4} py={{ base: 4, lg: 10 }}>
        <MenuMobile />
        <Board />
      </Container>
    </AppContainer>
  );
};
