import db from '../database';

export const createMatch = async (userId) => {
  const tx = await db.transaction();

  try {
    const ids = await tx('matches').insert({});
    const matchId = ids[0];

    await tx('matchUsers').insert({ matchId, userId });
    await tx.commit();

    return matchId;
  } catch (err) {
    console.error('createMatch error: ', err);
    await tx.rollback();
  }
};

export const createMatchStart = async ({ matchId, userId, option }) => {
  const tx = await db.transaction();

  try {
    await tx('matchUsers').insert({ matchId, userId });
    await tx('matchStart').insert({ matchId });
    await tx('matchTime').insert({ matchId, option });

    await tx.commit();

    return matchId;
  } catch (err) {
    console.error('createMatch error: ', err);
    await tx.rollback();
  }
};

export const createMatchEnd = async ({ matchId, userId }) => (
  await db('matchEnd').insert({ matchId, userId })
);
