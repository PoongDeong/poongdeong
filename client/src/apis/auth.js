import axios from 'axios';

const dotenv = require('dotenv');

dotenv.config();

const AUTH_URL = `${process.env.API_URL}/auth`;

export const postSignUp = async ({ email, nickname, password }) => {
  const { data } = await axios.post(`${AUTH_URL}/signup`, {
    email, nickname, password,
  });
  return data;
};

export const postLogin = async ({ email, password }) => {
  const { data } = await axios.post(`${AUTH_URL}/login`, {
    email, password,
  });
  return data.token;
};
