import { Stack, useColorModeValue } from '@chakra-ui/react';
import React, { DragEvent, FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEntryStore } from '../../hooks';
import { EntryStatus } from '../../interfaces';
import { RootState } from '../../store';
import { updateEntry } from '../../store/entries/entrySlice';
import { endDragging } from '../../store/ui/uiSlice';
import { EntryCard } from './EntryCard';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { isDragging } = useSelector((state: RootState) => state.ui);
  const { startUpdatingStatus } = useEntryStore();
  const entries = useSelector((state: RootState) => state.entries);
  const dispatch = useDispatch();
  const entriesByStatus = useMemo(
    () => entries.filter(entry => entry.status === status),
    [entries]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    startUpdatingStatus({ _id: id, status });
    dispatch(endDragging());
  };
  return (
    <Stack
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      direction={'column'}
      h={600}
      p={4}
      mt={2}
      spacing={4}
      bgColor={useColorModeValue('gray.50', 'gray.900')}
      rounded="lg"
      boxShadow="md"
      overflowY="scroll"
      sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all .3s' }}
      border={isDragging ? '2px' : 'none'}
      borderStyle={isDragging ? 'dashed' : 'none'}
      _light={{ borderColor: ' gray.700' }}
      _dark={{ borderColor: ' gray.100' }}
    >
      {entriesByStatus.map(entry => (
        <EntryCard key={entry._id} entry={entry} />
      ))}
    </Stack>
  );
};
