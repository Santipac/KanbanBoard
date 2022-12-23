import React from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Textarea } from '@chakra-ui/react';
import { Formik } from 'formik';
import { DragEvent, FC } from 'react';
import { useDispatch } from 'react-redux';
import { endDragging, startDragging } from '../../store/ui/uiSlice';
import { motion as m, PanInfo } from 'framer-motion';
import { useEntryStore } from '../../hooks/useEntryStore';
import { Entry } from '../../types/models';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const dispatch = useDispatch();
  const { startUpdatingDescription, startDeletingEntry } = useEntryStore();
  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry.id);
    dispatch(startDragging());
  };

  const onDragEnd = () => {
    dispatch(endDragging());
  };

  return (
    <div draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Box
        role="group"
        minH={100}
        rounded="lg"
        w="full"
        p={4}
        boxShadow="xl"
        position="relative"
        bgColor={entry.color}
        as={m.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: '1' }}
      >
        <IconButton
          position="absolute"
          top={0}
          right={0}
          zIndex={100}
          aria-label="delete-task"
          size="md"
          colorScheme="solid"
          _light={{ color: 'gray.700' }}
          _dark={{ color: 'blackAlpha.800' }}
          icon={<DeleteIcon />}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          onClick={() => startDeletingEntry(entry.id)}
        />
        <Flex w="full" h="full" justifyContent="center" pt={3} m={0}>
          <Formik
            initialValues={{ description: '' }}
            onSubmit={values => {
              console.log(values);
            }}
          >
            {({ handleBlur, handleChange, values, setSubmitting, dirty }) => (
              <Textarea
                name="description"
                onChange={handleChange}
                onBlur={async event => {
                  handleBlur(event);
                  if (!dirty) return;
                  setSubmitting(true);
                  startUpdatingDescription({
                    id: entry.id,
                    description: values.description,
                  });
                  setSubmitting(false);
                }}
                defaultValue={entry.description}
                fontWeight="semibold"
                cursor="inherit"
                border="none"
                p={0}
                resize="none"
                minH={70}
                focusBorderColor="transparent"
                _light={{ color: 'blackAlpha.800' }}
                _dark={{ color: 'blackAlpha.800' }}
                placeholder="Escribe algo..."
                _placeholder={{ color: 'blackAlpha.500' }}
                autoFocus={true}
              />
            )}
          </Formik>
        </Flex>
      </Box>
    </div>
  );
};
