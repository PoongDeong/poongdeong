import jwtToken from './jwtToken.service';

describe('jwtToken', () => {
  let privateKey;
  let token;

  beforeEach(() => {
    privateKey = 'PRIVATE_KEY';
  });

  context('with given Id', () => {
    const id = 'USER_ID';
    describe('createToken', () => {
      it('returns a token ', async () => {
        token = await jwtToken.createToken({ id });
        expect(token).toBeDefined();
      });
    });
  });

  context('with given Token', () => {
    const id = 'USER_ID';
    describe('verifyToken', () => {
      it('matches id', async () => {
        const decipheredId = await jwtToken.verifyToken(token);
        expect(id).toBe(decipheredId.id);
      });
    });
  });
});
