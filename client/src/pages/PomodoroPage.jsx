import React from 'react';

import PomodoroTimer from '../components/PomodoroTimer';
import PomodoroMessage from '../components/PomodoroMessage';
import PomodoroUserInfo from '../components/PomodoroUserInfo';

const styles = {
  videoBox: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  userBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
};

export default function PomodoroPage() {
  return (
    <div>
      <PomodoroMessage />
      <PomodoroTimer />
      <div css={styles.videoBox}>
        <div css={styles.userBox}>
          <PomodoroUserInfo />
        </div>
        <div css={styles.userBox}>
          <PomodoroUserInfo />
        </div>
      </div>
    </div>
  );
}
