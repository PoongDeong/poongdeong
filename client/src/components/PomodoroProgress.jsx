import React from 'react';

const styles = {
  box: {
    padding: '20px 20px',
    margin: '20px',
    border: '1px solid black',
    textAlign: 'center',
    fontSize: '15px',
  },
};

export default function PomodoroProgress() {
  return (
    <div style={styles.box}>
      퐁당 진행상황
    </div>
  );
}
