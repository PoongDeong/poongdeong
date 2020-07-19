import React from 'react';

import PomodoroTimer from '../components/PomodoroTimer';
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
    marginTop: '50px',
  },
  statement: {
    color: '#953131',
    textAlign: 'center',
    marginTop: '50px',
    fontWeight: 'bold',
  },
};

export default function PomodoroPage({ isPartnerOn }) {
  return (
    <div>
      <div css={styles.statement}>집중하세요! 지금 풍덩이 진행중입니다!</div>
      <PomodoroTimer isPartnerOn={isPartnerOn} />
      <div css={styles.videoBox}>
        <div css={styles.userBox}>
          <PomodoroUserInfo
            name="나"
          />
        </div>
        <div css={styles.userBox}>
          <PomodoroUserInfo
            name="상대방"
          />
        </div>
      </div>
    </div>
  );
}
