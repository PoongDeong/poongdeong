import React from 'react';

const styles = {
  box: {
    padding: '10px 20px',
    margin: '20px',
    border: '1px solid black',
    textAlign: 'center',
    fontSize: '15px',
  },
};

export default function PomodoroMessage() {
  return (
    <div css={styles.box}>
      일찍 일어나는 새가 일찍 잡아먹힌다
    </div>
  );
}
