import jwtToken from './jwtToken.service';

describe('jwtToken', () => {
  let privateKey;

  beforeEach(() => {
    privateKey = 'PRIVATE_KEY';
  });

  context('with given Id', () => {
    const email = 'USER_ID';
    describe('createToken', () => {
      it('returns a token ', async () => {
        const token = await jwtToken.createToken({ email });
        expect(token).toBeDefined();
      });
    });
  });

  context('with given Token', () => {
    const email = 'USER_ID';
    describe('verifyToken', () => {
      it('matches id', async () => {
        const token = await jwtToken.createToken({ email }); // given async라서 describe 밖에서 가 아닌 it 안에서 가져옴.
        const decipheredId = await jwtToken.verifyToken(token);
        expect(email).toBe(decipheredId.email);
      });
    });
  });
});
