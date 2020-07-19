import axios from 'axios';

const dotenv = require('dotenv');

dotenv.config();

const UPLOAD_URL = `${process.env.API_URL}/upload`;
const token = localStorage.getItem('token');

export const patchUploadProfileImage = async (formData) => {
  const { data } = await axios.patch(`${UPLOAD_URL}/userimage`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, token });
  return data.userURL;
};

export default patchUploadProfileImage;
