import React from 'react';

import {css} from 'emotion';

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
    <div className={styles.box}>
      <button className={styles.button}>매칭 시작</button>
    </div>
  );
}

export default MatchingBtn;
