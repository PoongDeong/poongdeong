import db from '../database';

import createTable from '../hooks/create-table';
import createUser from '../hooks/create-user';

import userRepository from '../repository/user.repository';
import uploadService from './upload.service';

jest.mock('../repository/user.repository');

describe('uploadService', () => {
  beforeEach(async () => {
    await db.schema.dropTableIfExists('users');
    await createTable();
    await createUser();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe('changeUserImage', () => {
    const newuserURL = 'https://CHANGED_URL';
    beforeEach(() => {
      userRepository.setUserImage.mockResolvedValue();
    });

    it('changes to the given image', async () => {
      await uploadService.changeUserImage('tester@example.com', newuserURL);
      expect(userRepository.setUserImage).toHaveBeenCalled();
    });
  });
});
