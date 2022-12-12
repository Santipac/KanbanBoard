import { HamburgerIcon } from '@chakra-ui/icons';
import { Avatar, Box, Flex, IconButton, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

interface Props {
  collapse: boolean;
  setCollapse: (e: boolean) => void;
}

export const SideBar: FC<Props> = ({ collapse, setCollapse }) => {
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
          <IconButton
            bgColor="transparent"
            _hover={{ bgColor: 'transparent' }}
            _focus={{ bgColor: 'transparent' }}
            aria-label="Menu Colapse"
            icon={
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            }
            onClick={() => setCollapse(!collapse)}
          />
        </Box>
      </Box>
    </Flex>
  );
};
