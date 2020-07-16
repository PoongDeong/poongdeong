import axios from 'axios';

const API_URL = 'https://api.poongdeong.com';

export const postSignUp = async ({ id, nickname, password }) => {
  const { data } = await axios.post(`${API_URL}/signup`, {
    id, nickname, password,
  });

  return data.token;
};

export const postLogin = async ({ id, password }) => {
  const { data } = await axios.post(API_URL, {
    id, password,
  });

  return data.token;
};
