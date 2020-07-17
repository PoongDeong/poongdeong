import reducer, {
  setSignUpNickName, setSignUpPassword, setSignUpPasswordCheck,
  setIsLogin, setToken, setSignUpId, setTimeOption, setCategoryOption, setIsMatchingButtonClicked,
} from './slice';

describe('reducer', () => {
  describe('setIsLogin', () => {
    it('changes isLogin', () => {
      const state = reducer(undefined, setIsLogin());

      expect(state.isLogin).toBe(false);
    });
  });

  describe('setToken', () => {
    const token = '1234';

    it('changes token', () => {
      const state = reducer(undefined, setToken(token));

      expect(state.token).toBe(token);
    });
  });

  describe('setSignUpId', () => {
    const id = 'test@test.com';

    it('changes id state', () => {
      const state = reducer(undefined, setSignUpId(id));

      expect(state.signUpFields.id).toBe(id);
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

  describe('setIsMatchingButtonClicked', () => {
    it('changes isMatchingButtonClicked state', () => {
      const state = reducer(undefined, setIsMatchingButtonClicked());

      expect(state.isMatchingButtonClicked).toBe(true);
    });
  });
});
