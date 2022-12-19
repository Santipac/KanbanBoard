import { SimpleGrid } from '@chakra-ui/react';
import { ColumnType } from '../../types/enums';
import { Column } from './Column';

export const Board = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 16, md: 2 }}
      gap={20}
    >
      <Column color="gray" column={ColumnType.TO_DO} />
      <Column color="green" column={ColumnType.COMPLETED} />
    </SimpleGrid>
  );
};
