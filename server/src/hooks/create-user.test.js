import db from '../database';

import createUser from './create-user';

import createTable from './create-table';

describe('create-user', () => {
  beforeEach(async () => {
    await db.schema.dropTableIfExists('users');
    await createTable();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('creates table', async () => {
    await createUser();

    const users = await db('users');

    expect(users).toHaveLength(1);
  });

  context('when already user exists', () => {
    beforeEach(async () => {
      await createUser();
    });

    it('doesn\'t create user', async () => {
      await createUser();

      const users = await db('users');

      expect(users).toHaveLength(1);
    });
  });
});
