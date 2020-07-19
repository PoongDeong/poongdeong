import axios from 'axios';

const dotenv = require('dotenv');

dotenv.config();

const USER_URL = `${process.env.API_URL}/user`;

export const getUserImage = async () => {
  const token = localStorage.getItem('token');

  const { data } = await axios.get(`${USER_URL}/userImage/${token}`, {
    params: {
      token,
    },
  });
  return data.userURL;
};

export const postUserInfo = async () => {
  const token = localStorage.getItem('token');
  const { data } = await axios.post(`${USER_URL}/info`, { token });

  return data.userInfo;
};
