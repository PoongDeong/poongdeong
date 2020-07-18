import axios from 'axios';

const dotenv = require('dotenv');

dotenv.config();

export const postSignUp = async ({ email, nickname, password }) => {
  const { data } = await axios.post(`${process.env.API_URL}/auth/signup`, {
    email, nickname, password,
  });
  return data;
};

export const postLogin = async ({ email, password }) => {
  const { data } = await axios.post(`${process.env.API_URL}/auth/login`, {
    email, password,
  });
  return data.token;
};
