import React from 'react';

import { useHistory } from 'react-router-dom';

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    maxWidth: '200px',
    width: '60%',
    height: '60%',
    margin: '60px 0px',
  },
  input: {
    background: '#fafafa',
    border: '1px solid #dbdbdb',
    padding: '10px 35px',
    margin: '5px -10px 5px -10px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    borderRadius: '4px',
    backgroundColor: 'cornflowerblue',
    color: 'white',
    border: '1px solid #dbdbdb',
    padding: '7px 0px',
    margin: '6px -10px 0px -10px',
    width: '109%',
  },
  font: {
    color: 'rgba(var(--f52, 153, 153, 153), 1)',
    paddingBottom: '4px',
  },
};

export default function LoginPage() {
  const history = useHistory();

  const goToSignUpPage = () => {
    history.push('/join');
  };

  return (
    <div css={styles.page}>
      <img css={styles.logo} src="../src/images/logo.png" alt="Logo" />
      <form
        css={styles.form}
      >
        <input
          defaultValue=""
          placeholder="전화번호, 사용자 이름, 이메일"
          css={styles.input}
        />
        <input
          type="password"
          defaultValue=""
          placeholder="비밀번호"
          css={styles.input}
        />
        <input
          type="submit"
          value="로그인"
          css={styles.button}
        />
        <button
          onClick={goToSignUpPage}
          type="button"
          css={styles.button}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
