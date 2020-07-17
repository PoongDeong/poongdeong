import express from 'express';
import { body } from 'express-validator';

import authService from '../services/auth.service';
import validate from '../validator/validator';

const router = express.Router();

router.post('/login', validate([body('email').isEmail(), body('password').isLength({ min: 1 })]), async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login({ email, password });
    res.status(200).send({ token });
  } catch (err) {
    const { message } = err;
    if (message === 'User not exist') {
      res.status(400).send({ message });
      return;
    }

    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/signup', validate([body('email').isEmail(), body('password').isLength({ min: 1 }), body('nickname').isLength({ min: 1 })]), async (req, res) => {
  const { email, password, nickname } = req.body;
  try {
    const errors = await authService.signup({ email, password, nickname });
    if (errors) {
      res.status(400).send({ errors });
      return;
    }

    res.status(201).send({});
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

export default router;
