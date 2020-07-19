import axios from 'axios';

const dotenv = require('dotenv');

dotenv.config();

const UPLOAD_URL = `${process.env.API_URL}/upload`;

export const patchUploadProfileImage = async (formData) => {
  const token = localStorage.getItem('token');

  const { data } = await axios.patch(`${UPLOAD_URL}/userImage`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, token });

  return data.userUrl;
};

export default patchUploadProfileImage;
