import axios from 'axios';

export const postSignUp = async ({id, nickname, password}) => {
  const { data } = await axios.post('https://api.poongdeong.com/signup', {
    id, nickname, password
  });

  return data.token;
}
