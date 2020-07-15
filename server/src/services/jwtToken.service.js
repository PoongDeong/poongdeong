import jwt from 'jsonwebtoken';

const privateKey = 'PRIVATE_KEY';

const JWTToken = {

  async createToken({ email }) {
    return jwt.sign({ email }, privateKey,
      { expiresIn: '17h', subject: 'userInfo' });
  },

  async verifyToken(token) {
    return jwt.verify(token, privateKey);
  },
};

module.exports = JWTToken;
