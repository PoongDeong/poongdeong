import express from 'express';
import authService from '../services/auth.service';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body.userInfo;
  try {
    const token = await authService.login({ email, password });
    res.status(200).send({ token });
  } catch (err) {
    res.status(401).send(err);
  }
});

export default router;
