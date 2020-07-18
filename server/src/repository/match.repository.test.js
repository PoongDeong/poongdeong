import db from '../database';

import createTable from '../hooks/create-table';

import {
  createMatch,
  createMatchStart,
} from './match.repository';
import { createMatchEnd } from '../services/match.service';

describe('MatchRepository', () => {
  const userId = 1;
  const matchId = 1;
  const option = '25분';

  beforeEach(async () => {
    const promises = [
      'matches',
      'matchUsers',
      'matchStart',
      'matchEnd',
      'matchTime',
    ].map((table) => db(table));
    await Promise.all(promises);
    await createTable();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe('create', () => {
    context('with valid userId', () => {
      it('creates match and matchUser', async () => {
        const id = await createMatch(userId);

        expect(id).not.toBeUndefined();
      });
    });

    context('with wrong userId', () => {
      it('creates match and ma', async () => {
        const id = await createMatch('WRONG_ID');

        expect(id).toBeUndefined();
      });
    });
  });

  describe('createMatchStart', () => {
    context('with valid params', () => {
      it('creates matchUser and matchStart', async () => {
        const id = await createMatchStart({ matchId, userId, option });

        expect(id).toBe(userId);
      });
    });

    context('with wrong userId', () => {
      it('creates matchUser and matchStart', async () => {
        const id = await createMatchStart({ matchId, option, userId: '' });

        expect(id).toBeUndefined();
      });
    });
  });

  describe('createMatchEnd', () => {
    it('returns insertedId', async () => {
      const id = await createMatchEnd({ matchId, userId });

      expect(id).not.toBeUndefined();
    });
  });
});
