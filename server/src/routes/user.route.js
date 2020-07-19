import express from 'express';
import { query } from 'express-validator';

import validate from '../validator/validator';
import userService from '../services/user.service';
import JWTToken from '../services/jwtToken.service';

const router = express.Router();

router.post('/info', async (req, res) => {
  const { token } = req.body;
  try {
    const userInfo = await userService.getUserInfo(token);

    delete userInfo.password;
    res.status(200).send({ userInfo });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/userImage/:token', validate([
  query('token').exists(),
]), async (req, res) => {
  const { token } = req.params;
  try {
    const userURL = await userService.getUserImageURL(JWTToken.verifyToken(token));
    res.status(200).send({ userURL });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

export default router;
