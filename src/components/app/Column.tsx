import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FC } from 'react';
import { useTaskStore } from '../../hooks';
import { Task } from './Task';
import { ColumnType } from '../../types/enums';

interface Props {
  column: ColumnType;
  color: string;
}
export const Column: FC<Props> = ({ column, color }) => {
  const { tasks, startCreatingTask } = useTaskStore();
  const tasksFiltered = tasks.filter(task => task.column === column);

  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge px={2} py={2} rounded="lg" colorScheme={color}>
          {column}
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
        onClick={() => startCreatingTask(column)}
      />

      <Stack
        direction={{ base: 'row', md: 'column' }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue('gray.50', 'gray.900')}
        rounded="lg"
        boxShadow="md"
      >
        {tasksFiltered.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </Stack>
    </Box>
  );
};
