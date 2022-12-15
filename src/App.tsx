import { Box, Container, Flex, SimpleGrid, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Column } from './components/app/Column';
import { SideBar, MenuMobile } from './components/app/ui';
import { ColumnType } from './types/enums';

export const App = () => {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      minH="100vh"
      _light={{ backgroundColor: 'gray.100' }}
      _dark={{ backgroundColor: 'gray.900' }}
      padding={5}
      display="flex"
      alignItems="center"
    >
      <SideBar />

      <Flex
        as="main"
        w="full"
        minH="90vh"
        _light={{ backgroundColor: 'white' }}
        _dark={{ backgroundColor: 'blackAlpha.500' }}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        position="relative"
        borderRadius="3xl"
      >
        <Container maxWidth="container.xl" px={4} py={10}>
          <MenuMobile />
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 16, md: 3 }}
          >
            <Column column={ColumnType.TO_DO} />
            <Column column={ColumnType.IN_PROGRESS} />

            <Column column={ColumnType.COMPLETED} />
          </SimpleGrid>
        </Container>
      </Flex>
    </Stack>
  );
};
