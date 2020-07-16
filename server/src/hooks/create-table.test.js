import db from '../database';

import createTable from './create-table';

describe('create-table', () => {
  beforeEach(async () => {
    await db.schema.dropTableIfExists('users');
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('creates table', async () => {
    await createTable();

    const users = await db('users');

    expect(users).toHaveLength(0);
  });

  context('when already table exists', () => {
    beforeEach(async () => {
      await createTable();
    });
    it('doesnt creates table', async () => {
      await createTable();

      const users = await db('users');

      expect(users).toHaveLength(0);
    });
  });
});
