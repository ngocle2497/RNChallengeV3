import { faker } from '@faker-js/faker';

import { Box } from './type';

export const randomBox = (): Box => ({
  id: faker.datatype.uuid(),
  name: faker.random.word(),
});
