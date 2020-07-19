import db from '../database';

const createTable = async () => {
  const usersExists = await db.schema.hasTable('users');
  if (!usersExists) {
    await db.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('email').unique();
      table.string('nickname').unique();
      table.string('password');
      table.string('userURL');
    });
  }

  const matchesExists = await db.schema.hasTable('matches');
  if (!matchesExists) {
    await db.schema.createTable('matches', (table) => {
      table.increments('id');
    });
  }

  const matchUsersExists = await db.schema.hasTable('matchUsers');
  if (!matchUsersExists) {
    await db.schema.createTable('matchUsers', (table) => {
      table.increments('id');
      table.bigInteger('matchId').notNullable();
      table.bigInteger('userId').notNullable();
    });
  }

  const matchStartExists = await db.schema.hasTable('matchStart');
  if (!matchStartExists) {
    await db.schema.createTable('matchStart', (table) => {
      table.increments('id');
      table.bigInteger('matchId').notNullable();
      table.timestamp('createdAt').defaultTo(db.fn.now());
    });
  }

  const matchTimeExists = await db.schema.hasTable('matchTime');
  if (!matchTimeExists) {
    await db.schema.createTable('matchTime', (table) => {
      table.increments('id');
      table.bigInteger('matchId').notNullable();
      table.string('option').notNullable();
    });
  }

  const matchEndExists = await db.schema.hasTable('matchEnd');
  if (!matchEndExists) {
    await db.schema.createTable('matchEnd', (table) => {
      table.increments('id');
      table.bigInteger('matchId').notNullable();
      table.bigInteger('userId').notNullable();
      table.timestamp('createdAt').defaultTo(db.fn.now());
    });
  }
};

export default createTable;
