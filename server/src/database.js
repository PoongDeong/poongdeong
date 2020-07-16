import knex from 'knex';

import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/.env` });

const config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
  },
};

const db = knex(config);

export default db;
