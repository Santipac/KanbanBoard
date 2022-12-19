import { Container } from '@chakra-ui/react';
import { Board } from './components/app';
import { MenuMobile, AppContainer } from './components/app/ui';

export const App = () => {
  return (
    <AppContainer>
      <Container maxWidth="container.xl" px={4} py={10}>
        <MenuMobile />
        <Board />
      </Container>
    </AppContainer>
  );
};
