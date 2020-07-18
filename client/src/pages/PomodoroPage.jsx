import React from 'react';
import PomodoroVideo from '../components/PomodoroVideo';
import PomodoroTimer from '../components/PomodoroTimer';
import PomodoroMessage from '../components/PomodoroMessage';
import PomodoroUserInfo from '../components/PomodoroUserInfo';
import MatchingSystem from "../components/MatchingSystem";

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
          {/*<PomodoroVideo />*/}
          <MatchingSystem />
          <PomodoroUserInfo />
        </div>
        <div css={styles.userBox}>
          <PomodoroVideo />
          <PomodoroUserInfo />
        </div>
      </div>
    </div>
  );
}
