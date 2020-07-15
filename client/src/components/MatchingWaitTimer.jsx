import React from 'react';

const styles = {
  text: {
    marginBottom: '20px',
    color: '#bbdefb',
    textAlign: 'center',
  }
}

export default function MatchingWaitTimer() {
  return (
    <div css={styles.text}>
      대기시간: 11초
    </div>
  );
}
