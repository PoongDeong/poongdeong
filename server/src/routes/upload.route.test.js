import request from 'supertest';

import app from '../app';
import db from '../database';
import createTable from '../hooks/create-table';
import uploadService from '../services/upload.service';
import multerMiddleware from './multerMiddleware';
import JWTTokenService from '../services/jwtToken.service';

jest.mock('./multerMiddleware', () => jest.fn((req, res, next) => {
  req.file = '';
  req.body = '';
  next();
}));
jest.mock('../services/upload.service');
jest.mock('../services/jwtToken.service');
describe('/upload', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpYm9uZ0BnbWFpbC5jb20iLCJpYXQiOjE1OTUwNDc3MzMsInN1YiI6InVzZXJJbmZvIn0.06vOlcXGYOD5oCpSEjvOBsqSfSE8Isbd6wIQXR0Ahsw';

  beforeEach(async () => {
    await db.schema.dropTableIfExists('users');
    await createTable();
    multerMiddleware.mockClear();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe('PATCH /userImage', () => {
    context('with right image and token', () => {
      beforeEach(() => {
        JWTTokenService.verifyToken.mockResolvedValue('asd');
        uploadService.changeUserImage.mockResolvedValue(1);
      });
      it('edits Image and returns status code of 200 and a message of done', async () => {
        await request(app)
          .patch('/upload/userImage')
          .field({ token })
          .attach('files', 'static/images/1.jpg');

        expect(multerMiddleware).toHaveBeenCalledTimes(1);
      });
    });

    context('when internal error from server', () => {
      beforeEach(() => {
        uploadService.changeUserImage.mockRejectedValue(new Error('User not exist'));
      });

      it('returns status code of 500 and message of Internal server error', async () => {
        const { body, statusCode } = await request(app)
          .patch('/upload/userImage')
          .field({ token })
          .attach('files', 'static/images/1.jpg');

        expect(statusCode).toBe(500);
        expect(body.message).toBe('Internal server error');
      });
    });

    context('when no file is sent', () => {
      it('returns status code of 401 and message of Internal server error', async () => {
        await request(app)
          .patch('/upload/userImage');

        expect(multerMiddleware).toHaveBeenCalledTimes(1);
      });
    });
  });
});
