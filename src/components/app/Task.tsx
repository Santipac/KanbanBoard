import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, Textarea } from '@chakra-ui/react';
import { Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { pickChakraRandomColor } from '../../helpers/RandomColor';
import { useTaskStore } from '../../hooks/useTaskStore';
import { TaskModel } from '../../types/models';

type TaskProps = {
  index: number;
  task: TaskModel;
};

export const Task: FC<TaskProps> = ({ index, task }) => {
  const { startDeleteTask } = useTaskStore();
  const [bgColor, setBgColor] = useState<string>(pickChakraRandomColor('.400'));

  return (
    <Box
      role="group"
      position="relative"
      rounded="lg"
      w="full"
      pl={3}
      pr={7}
      pt={3}
      pb={1}
      boxShadow="xl"
      cursor="grab"
      bgColor={bgColor}
    >
      <IconButton
        position="absolute"
        top={0}
        right={0}
        zIndex={100}
        aria-label="delete-task"
        size="md"
        colorScheme="solid"
        color={'gray.700'}
        icon={<DeleteIcon />}
        opacity={0}
        _groupHover={{
          opacity: 1,
        }}
        onClick={() => startDeleteTask(task.id)}
      />
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
            minH={70}
            maxH={200}
            focusBorderColor="transparent"
            color="whiteAlpha.900"
          />
        )}
      </Formik>
    </Box>
  );
};
