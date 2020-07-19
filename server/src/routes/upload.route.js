import express from 'express';

import uploadService from '../services/upload.service';
import jwtTokenService from '../services/jwtToken.service';

import uploadMiddleware from './multerMiddleware';

const router = express.Router();

router.patch('/userImage', uploadMiddleware, async (req, res) => {
  const { location } = req.file || 'a';
  const { token } = req.body || 'a';
  try {
    await uploadService.changeUserImage(jwtTokenService.verifyToken(token), location);
    res.status(200).send({ userURL: location });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

export default router;
