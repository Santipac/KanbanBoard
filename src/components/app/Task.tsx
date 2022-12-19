import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Textarea } from '@chakra-ui/react';
import { Formik } from 'formik';
import { FC, useState } from 'react';
import { pickChakraRandomColor } from '../../helpers';
import { useTaskStore } from '../../hooks';
import { TaskModel } from '../../types/models';

interface Props {
  task: TaskModel;
}

export const Task: FC<Props> = ({ task }) => {
  const [bgColor, setBgColor] = useState<string>(pickChakraRandomColor('.400'));
  const { startDeletingTask } = useTaskStore();
  return (
    <Box
      role="group"
      minH={100}
      rounded="lg"
      w="full"
      p={4}
      boxShadow="xl"
      position="relative"
      bgColor={bgColor}
    >
      <IconButton
        position="absolute"
        top={0}
        right={10}
        zIndex={100}
        aria-label="complete-task"
        size="md"
        colorScheme="solid"
        _light={{ color: 'gray.700' }}
        _dark={{ color: 'white' }}
        icon={<CheckCircleIcon />}
        opacity={0}
        _groupHover={{
          opacity: 1,
        }}
      />
      <IconButton
        position="absolute"
        top={0}
        right={0}
        zIndex={100}
        aria-label="delete-task"
        size="md"
        colorScheme="solid"
        _light={{ color: 'gray.700' }}
        _dark={{ color: 'white' }}
        icon={<DeleteIcon />}
        opacity={0}
        _groupHover={{
          opacity: 1,
        }}
        onClick={() => startDeletingTask(task.id)}
      />
      <Flex w="full" h="full" justifyContent="center" p={0} m={0}>
        <Formik
          initialValues={{ title: '' }}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {({ handleBlur, handleChange, values }) => (
            <Textarea
              name="title"
              onChange={handleChange}
              onBlur={event => {
                handleBlur(event);
                console.log(values.title);
              }}
              defaultValue={task.title}
              fontWeight="semibold"
              cursor="inherit"
              border="none"
              p={0}
              resize="none"
              minH="min-content"
              maxH={200}
              focusBorderColor="transparent"
              _light={{ color: 'black' }}
              _dark={{ color: 'white' }}
              placeholder="Escribe algo"
              _placeholder={{ color: 'blackAlpha.500' }}
            />
          )}
        </Formik>
      </Flex>
    </Box>
  );
};
