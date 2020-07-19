import db from '../database';

import createTable from '../hooks/create-table';

import {
  createMatch,
  createMatchStart,
  createMatchEnd,
} from './match.repository';

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
    ].map((table) => db.schema.dropTableIfExists(table));
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

        const matches = await db('matches');
        const matchUsers = await db('matchUsers');

        expect(id).not.toBeUndefined();
        expect(matches).toHaveLength(1);
        expect(matchUsers).toHaveLength(1);
      });
    });

    context('with wrong userId', () => {
      it('creates match and ma', async () => {
        const id = await createMatch('WRONG_ID');

        const matches = await db('matches');
        const matchUsers = await db('matchUsers');

        expect(id).toBeUndefined();
        expect(matches).toHaveLength(0);
        expect(matchUsers).toHaveLength(0);
      });
    });
  });

  describe('createMatchStart', () => {
    context('with valid params', () => {
      it('creates matchUser and matchStart', async () => {
        const id = await createMatchStart({ matchId, option, userId });

        const matchUsers = await db('matchUsers');
        const matchStarts = await db('matchStart');
        const matchTimes = await db('matchTime');

        expect(id).toBe(matchId);
        expect(matchUsers).toHaveLength(1);
        expect(matchStarts).toHaveLength(1);
        expect(matchTimes).toHaveLength(1);
      });
    });

    context('with wrong userId', () => {
      it('creates matchUser and matchStart', async () => {
        const id = await createMatchStart({ matchId, option, userId: '' });

        const matchUsers = await db('matchUsers');
        const matchStarts = await db('matchStart');
        const matchTimes = await db('matchTime');

        expect(id).toBeUndefined();
        expect(matchUsers).toHaveLength(0);
        expect(matchStarts).toHaveLength(0);
        expect(matchTimes).toHaveLength(0);
      });
    });
  });

  describe('createMatchEnd', () => {
    it('returns insertedId', async () => {
      const id = await createMatchEnd({ matchId, userId });

      const matchEnds = await db('matchEnd');

      expect(id).not.toBeUndefined();
      expect(matchEnds).toHaveLength(1);
    });
  });
});
