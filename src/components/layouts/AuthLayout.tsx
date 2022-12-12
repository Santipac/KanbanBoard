import { Box, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';
interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <Box
      w="full"
      minH="100vh"
      bg="gray.100"
      padding={5}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width={{ base: '100%', md: '70%', lg: '45%', xl: '30%' }}
        minH="30rem"
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={6}
      >
        {children}
      </Box>
    </Box>
  );
};
