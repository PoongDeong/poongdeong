import jwt from 'jsonwebtoken';

const privateKey = 'PRIVATE_KEY';

const JWTToken = {

  async createToken({ id }) {
    return jwt.sign({ id }, privateKey,
      { expiresIn: '17h', subject: 'userInfo' });
  },

  async verifyToken(token) {
    return jwt.verify(token, privateKey);
  },
};

module.exports = JWTToken;
