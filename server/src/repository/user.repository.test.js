import db from '../database';

import createTable from '../hooks/create-table';

import userRepository from './user.repository';

describe('user.repository', () => {
  const user = {
    email: 'tester@exapmle.com',
    password: '1234',
    nickname: 'nickname',
    userURL: 'http://test.com',
  };

  beforeEach(async () => {
    await db.schema.dropTableIfExists('users');
    await createTable();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe('create', () => {
    it('inserts user to users table', async () => {
      const result = await userRepository.create(user);

      expect(result).toHaveLength(1);
    });

    context('with duplicated email', () => {
      beforeEach(async () => {
        await userRepository.create(user);
      });

      it('inserts user to users table', async () => {
        try {
          await userRepository.create(user);
        } catch (err) {
          expect(err.code).toBe('ER_DUP_ENTRY');
        }
      });
    });
  });

  describe('findById', () => {
    let id;

    beforeEach(async () => {
      const ids = await userRepository.create(user);
      [id] = ids;
    });

    it('returns user', async () => {
      const foundUser = await userRepository.findById(id);

      expect(foundUser.email).toBe(user.email);
    });

    context('with not existing user', () => {
      it('returns user', async () => {
        const foundUser = await userRepository.findById(1000);

        expect(foundUser).toBeFalsy();
      });
    });
  });

  describe('findByNickname', () => {
    context('with existing user', () => {
      beforeEach(async () => {
        await userRepository.create(user);
      });

      it('returns user', async () => {
        const foundUser = await userRepository.findByNickname(user.nickname);

        expect(foundUser.email).toBe(user.email);
        expect(foundUser.nickname).toBe(user.nickname);
      });
    });

    context('with unexisting user', () => {
      it('returns undefined', async () => {
        const foundUser = await userRepository.findByNickname(user.nickname);

        expect(foundUser).toBeUndefined();
      });
    });
  });

  describe('findByEmail', () => {
    context('with existing user', () => {
      beforeEach(async () => {
        await userRepository.create(user);
      });

      it('returns user', async () => {
        const foundUser = await userRepository.findByEmail(user.email);

        expect(foundUser.email).toBe(user.email);
      });
    });

    context('with unexisting user', () => {
      it('returns undefined', async () => {
        const foundUser = await userRepository.findByEmail(user.email);

        expect(foundUser).toBeUndefined();
      });
    });
  });

  describe('setUserImage', () => {
    const userURL = 'http://NEW_URL.COM';
    it('changes user image url', async () => {
      await userRepository.create(user);
      await userRepository.setUserImage(user.email, userURL);
      const modifiedUser = await userRepository.findByEmail(user.email);

      expect(modifiedUser.userURL).not.toBe(user.userURL);
    });
  });

  describe('getUserImage', () => {
    beforeEach(async () => {
      await userRepository.create(user);
    });
    it('returns image url of the user', async () => {
      const userURL = await userRepository.getUserImage(user.email);
      expect(userURL).toBe(user.userURL);
    });
  });
});
