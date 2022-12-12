import { Box, Container, Flex, SimpleGrid, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Column } from './components/app/Column';
import { SideBar } from './components/app/ui/SideBar';
import { ColumnType } from './types/enums';

export const App = () => {
  const [collapse, setCollapse] = useState<boolean>(true);
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      minH="100vh"
      bg="gray.100"
      padding={5}
      display="flex"
      alignItems="center"
    >
      <SideBar collapse={collapse} setCollapse={setCollapse} />

      <Flex
        as="main"
        w="full"
        minH="90vh"
        bg="white"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        position="relative"
        borderRadius="3xl"
      >
        <Container maxWidth="container.xl" px={4} py={10}>
          <SimpleGrid
            columns={{ base: 1, md: 4 }}
            spacing={{ base: 16, md: 4 }}
          >
            <Column column={ColumnType.TO_DO} />
            <Column column={ColumnType.IN_PROGRESS} />
            <Column column={ColumnType.BLOCKED} />
            <Column column={ColumnType.COMPLETED} />
          </SimpleGrid>
        </Container>
      </Flex>
    </Stack>
  );
};
