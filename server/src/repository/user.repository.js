import userInfo from '../jsonStorage/user.json';

const userRepository = {
  checkPassword(id, password) {
    return !!userInfo.filter((user) => (user.email === id && user.password === password))[0];
  },
};

module.exports = userRepository;
