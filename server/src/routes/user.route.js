import express from 'express';

import user from '../services/user.service';

const router = express.Router();

router.post('/info', async (req, res) => {
  const { token } = req.body;
  try {
    const userInfo = await user.getInfo({ token });
    res.status(200).send({ userInfo });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

export default router;
