import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import { IoLogOutOutline, IoMoon, IoSunnyOutline } from 'react-icons/io5';
import { useAuthStore } from '../../../hooks';

export const MenuMobile = () => {
  const { photoURL, email, displayName, startSignOutUser } = useAuthStore();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      mb={4}
      w="full"
      justifyContent="end"
      display={{ base: 'flex', lg: 'none' }}
    >
      <Menu>
        <ButtonGroup as={MenuButton}>
          <Tooltip label={displayName}>
            <Avatar
              referrerPolicy="no-referrer"
              name={displayName!}
              src={photoURL!}
            />
          </Tooltip>
        </ButtonGroup>
        <MenuList>
          <MenuGroup title="Profile">
            <Text pl={3} fontWeight="semibold">
              {displayName}
            </Text>
            <Text
              pl={3}
              color="gray.400"
              fontStyle="italic"
              fontSize="sm"
              fontWeight="normal"
            >
              {email}
            </Text>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Actions">
            <MenuItem onClick={toggleColorMode}>
              {colorMode === 'dark' ? (
                <Flex display="flex" alignItems="center" gap={2} w="full">
                  <IoSunnyOutline color="gray" /> Light Mode
                </Flex>
              ) : (
                <Flex display="flex" alignItems="center" gap={2} w="full">
                  <IoMoon color="gray" /> Dark Mode
                </Flex>
              )}
            </MenuItem>
            <MenuItem onClick={() => startSignOutUser()}>
              <Flex display="flex" alignItems="center" gap={2} w="full">
                <IoLogOutOutline color="gray" />
                Salir
              </Flex>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};
