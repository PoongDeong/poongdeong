import React from 'react';

const styles = {
  message: {
    fontSize: '14px',
    color: 'red',
  },
};

export default function LoginErrorMessage() {
  return (
    <div css={styles.message}>
      아이디 혹은 비밀번호가 옳지 않습니다.
    </div>
  );
}
