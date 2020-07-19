import React from 'react';

import { useHistory } from 'react-router-dom';

const styles = {
  overAll: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '80px',
  },
  button: {
    marginTop: '20px',
    width: '200px',
    height: '70px',
    fontSize: '24px',
    fontWeight: 'bold',
    background: '#005CB2',
    color: '#FFFFFF',
    border: '0',
    borderRadius: '12px',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.26)',
  },
};

export default function MatchingEndPage() {
  const history = useHistory();

  const goToHome = () => {
    history.push('/');
  };

  return (
    <div css={styles.overAll}>
      <img src="../src/images/end.png" alt="end" />
      <h1>풍덩이 끝났습니다</h1>
      <h1>고생하셨습니다.</h1>
      <button
        onClick={goToHome}
        type="button"
        css={styles.button}
      >
        홈으로
      </button>
    </div>
  );
}
