import jwt from 'jsonwebtoken';

const privateKey = 'PRIVATE_KEY';

const JWTToken = {

  createToken({ email }) {
    return jwt.sign(
      { email }, 
      privateKey,
      { expiresIn: '17h', subject: 'userInfo' }
    );
  },

  verifyToken(token) {
    return jwt.verify(token, privateKey);
  },
};

module.exports = JWTToken;
