import * as MatchRepository from '../repository/match.repository';

export const createMatch = async (userId) => await MatchRepository.createMatch(userId);

export const createMatchStart = async ({ matchId, userId, option }) => (
  await MatchRepository.createMatchStart({ matchId, userId, option })
);

export const createMatchEnd = async ({ matchId, userId }) => {
  const result = await MatchRepository.createMatchEnd({ matchId, userId });
  return result[0];
};
