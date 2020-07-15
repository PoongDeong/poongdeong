import React from 'react';

const styles = {
  box: {
    alignItems: 'center',
    width: '80%',
    height: '140px',
    margin: '10px',
    border: '1px solid black',
  },
};

export default function PomodoroVideo() {
  return (
    <div css={styles.box}>
      영상
    </div>
  );
}
