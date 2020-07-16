import bcrypt from 'bcrypt';

import db from '../database';

const defaultUser = {
  id: 1,
  email: 'tester@example.com',
  nickname: 'user',
  password: '1234',
};

const createUser = async () => {
  const users = await db('users').where({ email: defaultUser.email });
  if (users.length === 0) {
    const encrypted = await bcrypt.hash(defaultUser.password, 10);
    await db('users').insert({
      ...defaultUser,
      password: encrypted,
    });
  }
};

export default createUser;
