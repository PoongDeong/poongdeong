import jwt from 'jsonwebtoken';

const privateKey = process.env.SECRET;

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

export default JWTToken;
