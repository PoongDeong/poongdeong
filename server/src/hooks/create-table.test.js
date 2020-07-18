import db from '../database';

import createTable from './create-table';

describe('create-table', () => {
  const tables = [
    'users',
    'matches',
    'matchUsers',
    'matchStart',
    'matchTime',
    'matchEnd',
  ];

  beforeEach(async () => {
    const promises = tables.map((table) => db.schema.dropTableIfExists(table));
    await Promise.all(promises);
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('creates table', async () => {
    await createTable();

    const promises = tables.map((table) => db(table));

    const result = await Promise.all(promises);

    result.forEach((it) => {
      expect(it).toHaveLength(0);
    });
  });

  context('when already table exists', () => {
    beforeEach(async () => {
      await createTable();
    });

    it('doesnt creates table', async () => {
      await createTable();

      const promises = tables.map((table) => db(table));

      const result = await Promise.all(promises);

      result.forEach((it) => {
        expect(it).toHaveLength(0);
      });
    });
  });
});
