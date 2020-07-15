import userInfo from '../jsonStorage/user.json';

const userRepository = {
  checkPassword(email, password) {
    return !!userInfo.find((user) => (user.email === email && user.password === password));
  },
};

module.exports = userRepository;
