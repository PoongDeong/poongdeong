import userInfoStorage from '../jsonStorage/user.json';

const userRepository = {
  checkPassword(email, password) {
    return !!userInfoStorage.find((user) => (user.email === email && user.password === password));
  },

  checkAvailability(email) {
    return !userInfoStorage.find((user) => (user.email === email));
  },

  checkNickNameAvailability(nickname) {
    return !userInfoStorage.find((user) => (user.nickname === nickname));
  },
};

module.exports = userRepository;
