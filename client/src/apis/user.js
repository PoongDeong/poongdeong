import axios from 'axios';

const dotenv = require('dotenv');

dotenv.config();

const USER_URL = `${process.env.API_URL}`;
const TOKEN = localStorage.getItem('token');

export const getUserImage = async () => {
  const { data } = await axios.get(`${USER_URL}/userImage/${TOKEN}`);

  return data.userURL;
};

export const postUserInfo = async () => {
  const { data } = await axios.post(`${USER_URL}/info`, { TOKEN });

  return data.userInfo;
};
