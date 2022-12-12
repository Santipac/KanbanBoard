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
import { TaskModel } from '../../types/models';
import { Task } from './Task';

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: 'gray',
  'In Progress': 'blue',
  Blocked: 'red',
  Completed: 'green',
};

const mockTask: TaskModel[] = [
  { id: '1', title: 'hola', column: ColumnType.TO_DO, color: 'gray.300' },
  { id: '2', title: 'hey', column: ColumnType.COMPLETED, color: 'blue.300' },
  {
    id: '3',
    title: 'q onda',
    column: ColumnType.COMPLETED,
    color: 'green.300',
  },
];

export const Column = ({ column }: { column: ColumnType }) => {
  const ColumnTasks = mockTask.map((task, index) => (
    <Task key={task.id} index={index} task={task} />
  ));

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
        {ColumnTasks}
      </Stack>
    </Box>
  );
};
