import userRepository from './user.repository';

describe('user.repository', () => {
  describe('checkPassword', () => {
    context('with existing id and right password', () => {
      it('returns true', () => {
        const valid = userRepository.checkPassword('gibong@gmail.com', '1234');
        expect(valid).toBe(true);
      });
    });

    context('with unexisting id', () => {
      it('returns false', () => {
        const valid = userRepository.checkPassword('UNEXISTING_ID', 'ANY_PASSWORD');
        expect(valid).toBe(false);
      });
    });

    context('with existing id and wrong password', () => {
      it('returns false', () => {
        const valid = userRepository.checkPassword('gibong@gmail.com', 'WRONG_PASSWORD');
        expect(valid).toBe(false);
      });
    });
  });

  describe('checkAvailability', () => {
    context('with available name', () => {
      it('returns true', () => {
        const valid = userRepository.checkAvailability('gibong1@gmail.com');
        expect(valid).toBe(true);
      });
    });

    context('with unavailable name', () => {
      it('returns false', () => {
        const valid = userRepository.checkAvailability('gibong@gmail.com');
        expect(valid).toBe(false);
      });
    });
  });

  describe('checkNicknameAvailability', () => {
    context('with available nickname', () => {
      it('returns true', () => {
        const valid = userRepository.checkNickNameAvailability('AVAILABLE_NICKNAME');
        expect(valid).toBe(true);
      });
    });

    context('with unavailable nickname', () => {
      it('returns false', () => {
        const valid = userRepository.checkNickNameAvailability('기봉');
        expect(valid).toBe(false);
      });
    });
  });
});
