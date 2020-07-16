import db from '../database';

const userRepository = {
  async create(user) {
    return await db('users').insert(user);
  },

  async findById(id) {
    const users = await db('users').where({ id });
    return users[0];
  },

  async findByNickname(nickname) {
    const users = await db('users').where({ nickname });
    return users[0];
  },

  async findByEmail(email) {
    const users = await db('users').where({ email });
    return users[0];
  },
};

export default userRepository;
