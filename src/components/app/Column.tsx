import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { ColumnType } from '../../types/enums';
import { Task } from './Task';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useTaskStore } from '../../hooks/useTaskStore';
import { v4 as uuid } from 'uuid';

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: 'gray',
  'In Progress': 'blue',
  Completed: 'green',
};

export const Column = ({ column }: { column: ColumnType }) => {
  const tasks = useSelector((state: RootState) => state.task);
  const taskColumn = tasks.filter(task => task.column === column);

  const { startCreateTask } = useTaskStore();
  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge
          px={2}
          py={2}
          rounded="lg"
          colorScheme={ColumnColorScheme[column]}
        >
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
        onClick={() =>
          startCreateTask({
            id: uuid(),
            title: 'Task 1',
            color: 'green',
            column,
          })
        }
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
        overflow="auto"
      >
        {taskColumn.map((task, index) => (
          <Task task={task} index={index} key={task.id} />
        ))}
      </Stack>
    </Box>
  );
};
