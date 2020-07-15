import jwtToken from './jwtToken.service';

describe('jwtToken', () => {
  context('with given Id', () => {
    const email = 'gibong@gmail.com';
    describe('createToken', () => {
      it('returns a token ', async () => {
        const token = await jwtToken.createToken({ email });
        expect(token).toBeDefined();
      });
    });
  });

  context('with given Token', () => {
    const email = 'gibong@gmail.com';
    let token;

    beforeEach(async () => {
      token = await jwtToken.createToken({ email });
    });

    describe('verifyToken', () => {
      it('matches id', async () => {
        const decipheredId = await jwtToken.verifyToken(token);
        expect(email).toBe(decipheredId.email);
      });
    });
  });
});
