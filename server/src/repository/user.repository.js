import userInfoStorage from '../jsonStorage/user.json';

const userRepository = {
  checkPassword(email, password) {
    return !!userInfoStorage.find((user) => (user.email === email && user.password === password));
  },

  checkAvailability(email) {
    return !userInfoStorage.find((user) => (user.email === email));
  },

};

module.exports = userRepository;
