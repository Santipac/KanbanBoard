import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Switch,
  Text,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useAuthStore } from '../../../hooks';
import { IoLogOutOutline, IoMoon, IoSunnyOutline } from 'react-icons/io5';

export const SideBar: FC = () => {
  const { displayName, photoURL, email, startSignOutUser } = useAuthStore();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      display={{ base: 'none', lg: 'flex' }}
      as="aside"
      w="full"
      h="90vh"
      maxW={100}
      _light={{ backgroundColor: 'white' }}
      _dark={{ backgroundColor: 'blackAlpha.500' }}
      alignItems="start"
      padding={6}
      flexDirection="column"
      transition="ease-in-out .2s"
      borderRadius="3xl"
    >
      <Box
        display="flex"
        flexDirection={{ base: 'row', lg: 'column' }}
        h="full"
        w="full"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box w="full">
          <Flex alignItems="center" gap={8} flex={1} flexDirection="column">
            <Tooltip label={displayName}>
              <Avatar
                name={displayName!}
                src={photoURL || ''}
                boxShadow="lg"
                referrerPolicy="no-referrer"
              />
            </Tooltip>
            <Tooltip label={colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
              <IconButton
                w="full"
                bgColor="transparent"
                _hover={{ bgColor: 'transparent' }}
                _focus={{ bgColor: 'transparent' }}
                aria-label="Dark Mode Switcher"
                onClick={toggleColorMode}
                icon={
                  colorMode === 'dark' ? (
                    <IoSunnyOutline size="30px" color="gray" />
                  ) : (
                    <IoMoon size="30px" color="gray" />
                  )
                }
              />
            </Tooltip>
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
