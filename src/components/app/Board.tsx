import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { Column } from './Column';

export const Board = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 3 }}
      spacing={{ base: 16, md: 3 }}
      gap={6}
    >
      <Column color="gray" status="To-do" />
      <Column color="blue" status="In Progress" />
      <Column color="green" status="Completed" />
    </SimpleGrid>
  );
};
