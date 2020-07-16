import db from '../database';

const createTable = async () => {
  const usersExists = await db.schema.hasTable('users');
  if (!usersExists) {
    await db.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('email').unique();
      table.string('nickname').unique();
      table.string('password');
    });
  }
};

export default createTable;
