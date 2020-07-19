import React from 'react';

const styles = {
  name: {
    color: '#3d53b4',
    fontWeight: 'bold',
  },
};

export default function PomodoroUserInfo({ name }) {
  return (
    <div>
      <div css={styles.name}>{name}</div>
    </div>
  );
}
