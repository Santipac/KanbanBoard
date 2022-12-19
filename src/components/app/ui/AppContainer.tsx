import { Flex, Stack } from '@chakra-ui/react';
import React, { FC } from 'react';
import { SideBar } from './SideBar';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AppContainer: FC<Props> = ({ children }) => {
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
        {children}
      </Flex>
    </Stack>
  );
};
