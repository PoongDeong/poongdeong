import userRepository from './user.repository';

describe('user.repository', () => {
  describe('checkPassword', () => {
    context('with existing id and right password', () => {
      it('returns true', () => {
        const valid = userRepository.checkPassword('gibong@gmail.com', '1234');
        expect(valid).toBe(true);
      });
    });

    describe('checkPassword', () => {
      context('with unexisting id', () => {
        it('returns false', () => {
          const valid = userRepository.checkPassword('gifd@gmail.com', '1111');
          expect(valid).toBe(false);
        });
      });
    });
  });
});
