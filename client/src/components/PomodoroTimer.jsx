import React from 'react';

const styles = {
  box: {
    padding: '80px 20px',
    margin: '20px',
    border: '1px solid black',
    textAlign: 'center',
    fontSize: '60px',
  },
};

export default function PomodoroTimer() {
  return (
    <div css={styles.box}>
      25:00
    </div>
  );
}
