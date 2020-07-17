import axios from 'axios';

// const API_URL = 'https://api.poongdeong.com';
const API_URL = 'http://localhost:3000/auth';

export const postSignUp = async ({ email, nickname, password }) => {
  const { data } = await axios.post(`${API_URL}/signup`, {
    email, nickname, password,
  });
  return data;
};

export const postLogin = async ({ email, password }) => {
  const { data } = await axios.post(`${API_URL}/login`, {
    email, password,
  });
  return data.token;
};
