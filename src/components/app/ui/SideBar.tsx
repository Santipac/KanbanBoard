import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useAuthStore } from '../../../hooks';
import { IoLogOutOutline } from 'react-icons/io5';
interface Props {
  collapse: boolean;
  setCollapse: (e: boolean) => void;
}

export const SideBar: FC<Props> = ({ collapse, setCollapse }) => {
  const { displayName, photoURL, email, startSignOutUser } = useAuthStore();

  return (
    <Flex
      display={{ base: 'none', lg: 'flex' }}
      as="aside"
      w="full"
      h="90vh"
      maxW={collapse ? 350 : 100}
      bg="white"
      alignItems="start"
      padding={6}
      flexDirection="column"
      justifyContent="space-between"
      transition="ease-in-out .2s"
      borderRadius="3xl"
    >
      <Box
        display="flex"
        flexDirection={{ base: 'row', lg: 'column' }}
        h="full"
        w="full"
        alignItems="center"
      >
        <Box flex={1} w="full">
          <Flex alignItems="center" gap={4}>
            <IconButton
              bgColor="transparent"
              _hover={{ bgColor: 'transparent' }}
              _focus={{ bgColor: 'transparent' }}
              aria-label="Menu Colapse"
              icon={
                <Avatar
                  name={displayName!}
                  src={photoURL || ''}
                  boxShadow="lg"
                  referrerPolicy="no-referrer"
                />
              }
              onClick={() => setCollapse(!collapse)}
            />
            <Flex flexDirection="column" display={collapse ? 'flex' : 'none'}>
              <Heading as="h2" fontSize="xl">
                {displayName}
              </Heading>
              <Text
                fontSize="md"
                fontWeight="normal"
                color="gray.400"
                fontStyle="italic"
              >
                {email}
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Flex w="full" alignItems="center">
          <Tooltip label="Salir">
            <IconButton
              ml={1}
              bgColor="transparent"
              _hover={{ bgColor: 'transparent' }}
              _focus={{ bgColor: 'transparent' }}
              aria-label="Logout button"
              onClick={() => startSignOutUser()}
              icon={<IoLogOutOutline size="35px" color="gray" />}
            />
          </Tooltip>
        </Flex>
      </Box>
    </Flex>
  );
};
