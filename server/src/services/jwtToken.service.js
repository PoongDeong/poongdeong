import jwt from 'jsonwebtoken';

const privateKey = 'PRIVATE_KEY';

const JWTToken = {

  createToken(data) {
    return jwt.sign(
      data,
      privateKey,
      { expiresIn: '17h', subject: 'userInfo' },
    );
  },

  verifyToken(token) {
    return jwt.verify(token, privateKey);
  },
};

module.exports = JWTToken;
