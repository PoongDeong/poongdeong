import { createMatch, createMatchStart, createMatchEnd } from './match.service';

import * as MatchRepository from '../repository/match.repository';

jest.mock('../repository/match.repository');

describe('MatchService', () => {
  const matchId = 1;
  const userId = 1;
  const matchEndId = 1;
  const option = '25분';

  beforeEach(() => {
    MatchRepository.createMatch.mockResolvedValue(matchId);
    MatchRepository.createMatchStart.mockResolvedValue(matchId);
    MatchRepository.createMatchEnd.mockResolvedValue([matchEndId]);
  });

  describe('createMatchAndUser', () => {
    it('returns created id', async () => {
      const id = await createMatch(userId);

      expect(id).toBe(matchId);
    });
  });

  describe('createMatchStart', () => {
    it('creates matchUser, matchStart and matchEnd', async () => {
      const id = await createMatchStart({ matchId, userId, option });

      expect(id).toBe(matchId);
    });
  });

  describe('createMatchEnd', () => {
    it('creates matchEnd', async () => {
      const id = await createMatchEnd({ matchId, userId });

      expect(id).toEqual(matchEndId);
    });
  });
});
