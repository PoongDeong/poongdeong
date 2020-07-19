import axios from 'axios';

const dotenv = require('dotenv');

dotenv.config();

const UPLOAD_URL = `${process.env.API_URL}/upload`;
const TOKEN = localStorage.getItem('token');

export const patchUploadProfileImage = async (formData) => {
  const { data } = await axios.post(`${UPLOAD_URL}/userimage`, { formData, headers: { 'Content-Type': 'multipart/form-data' }, TOKEN });

  return data.userUrl;
};

export default patchUploadProfileImage;
