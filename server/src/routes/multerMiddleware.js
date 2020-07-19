import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

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

const uploadMiddleware = upload.single('files');

export default uploadMiddleware;
