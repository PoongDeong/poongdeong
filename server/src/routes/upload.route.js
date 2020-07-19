import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import AWS from 'aws-sdk';
import { body } from 'express-validator';

import userService from '../services/upload.service';
import jwtTokenService from '../services/jwtToken.service';
import validate from '../validator/validator';

const router = express.Router();

// AWS.config.loadFromPath('config/awsconfig.json');
// AWS.config.update({
//   accessKeyId: process.env.accessKeyId,
//   secretAccessKey: process.env.secretAccessKey,
//   region: process.env.region,
// });

const s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET,
    key(req, file, cb) {
      const extension = path.basename(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    acl: 'public-read-write',
  }),
  limits: { fileSize: 10 * 512 * 512 },
});

router.patch('/userImage', upload.single('files'), validate([
  body('token').exists(),
]), async (req, res) => {
  const { location } = req.file;
  const { token } = req.body;
  try {
    await userService.changeUserImage(jwtTokenService.verifyToken(token), location);
    res.status(200).json('done');
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

export default router;
