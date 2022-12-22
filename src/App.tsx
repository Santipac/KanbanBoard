import React, { useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import { Board } from './components/app';
import { AppContainer, MenuMobile } from './components/app/ui';
import { useAuthStore, useEntryStore } from './hooks';

export const App = () => {
  const { uid } = useAuthStore();
  const { startLoadingEntry } = useEntryStore();
  useEffect(() => {
    startLoadingEntry();
  }, []);

  return (
    <AppContainer>
      <Container maxWidth="container.xl" px={4} py={{ base: 4, lg: 10 }}>
        <MenuMobile />
        <Board />
      </Container>
    </AppContainer>
  );
};
