import React from 'react';

const styles = {
  box: {
    textAlign: 'center',
  },
  button: {
    width: '200px',
    height: '40px',
    background: '#004ba0',
    color: '#bbdefb'
  },
}

function MatchingBtn() {
  return (
    <div css={styles.box}>
      <button css={styles.button}>매칭시작</button>
    </div>
  );
}

export default MatchingBtn;
