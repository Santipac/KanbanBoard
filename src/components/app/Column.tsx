import React from 'react';
import { v4 as uuid } from 'uuid';
import { FC } from 'react';
import { EntryStatus } from '../../interfaces';
import { EntryList } from './EntryList';
import {
  Badge,
  Box,
  Heading,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { createEntry } from '../../store/entries/entrySlice';
import { pickChakraRandomColor } from '../../helpers';

interface Props {
  color: string;
  status: EntryStatus;
}

export const Column: FC<Props> = ({ color, status }) => {
  const dispatch = useDispatch();
  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge px={2} py={2} rounded="lg" colorScheme={color}>
          {status}
        </Badge>
      </Heading>
      <IconButton
        size="xs"
        w="full"
        color={useColorModeValue('gray.500', 'gray.400')}
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        _hover={{ bgColor: useColorModeValue('gray.200', 'gray.600') }}
        py={2}
        variant="solid"
        colorScheme="black"
        aria-label="add-task"
        icon={<AddIcon />}
        onClick={() =>
          dispatch(
            createEntry({
              _id: uuid(),
              status,
              color: pickChakraRandomColor('.400'),
              description: '',
              createdAt: Date.now(),
            })
          )
        }
      />

      <EntryList status={status} />
    </Box>
  );
};
