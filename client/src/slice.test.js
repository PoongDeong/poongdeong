import reducer, {
  setSignUpNickName,
  setSignUpPassword,
  setSignUpPasswordCheck,
  toggleLoginState,
  setToken,
  setSignUpEmail,
  setTimeOption,
  setCategoryOption,
  toggleMatchingButton,
  setMatchingWaitingTimer,
} from './slice';

describe('reducer', () => {
  describe('toggleLoginState', () => {
    it('changes loginState', () => {
      const loginState = false;
      const state = reducer({ loginState }, toggleLoginState());

      expect(state.loginState).toBe(!loginState);
    });
  });

  describe('setToken', () => {
    const token = '1234';

    it('changes token', () => {
      const state = reducer(undefined, setToken(token));

      expect(state.token).toBe(token);
    });
  });

  describe('setSignUpEmail', () => {
    const email = 'test@test.com';

    it('changes email state', () => {
      const state = reducer(undefined, setSignUpEmail(email));

      expect(state.signUpFields.email).toBe(email);
    });
  });

  describe('setSignUpNickName', () => {
    const nickname = 'test123';

    it('changes nickname state', () => {
      const state = reducer(undefined, setSignUpNickName(nickname));

      expect(state.signUpFields.nickname).toBe(nickname);
    });
  });

  describe('setSignUpPassword', () => {
    const password = '1234';

    it('changes password state', () => {
      const state = reducer(undefined, setSignUpPassword(password));

      expect(state.signUpFields.password).toBe(password);
    });
  });

  describe('setSignUpPasswordCheck', () => {
    const passwordCheck = '1234';

    it('changes passwordCheck state', () => {
      const state = reducer(undefined, setSignUpPasswordCheck(passwordCheck));

      expect(state.signUpFields.passwordCheck).toBe(passwordCheck);
    });
  });

  describe('setTimeOption', () => {
    const selectedTime = '25분';

    it('sets time option state', () => {
      const state = reducer(undefined, setTimeOption(selectedTime));

      expect(state.timeOption).toBe(selectedTime);
    });
  });

  describe('setCategoryOption', () => {
    const selectedCategory = '독서';

    it('sets category option state', () => {
      const state = reducer(undefined, setCategoryOption(selectedCategory));

      expect(state.categoryOption).toBe(selectedCategory);
    });
  });

  describe('toggleMatchingButton', () => {
    it('changes matchingButtonState state', () => {
      const state = reducer(undefined, toggleMatchingButton(true));

      expect(state.matchingButtonState).toBe(true);
    });
  });

  describe('setMatchingWaitingTimer', () => {
    const initialSecond = 1;

    it('sets matching waiting timer', () => {
      const state = reducer(undefined, setMatchingWaitingTimer(initialSecond));

      expect(state.matchingWaitingTimer).toBe(initialSecond);
    });
  });
});
