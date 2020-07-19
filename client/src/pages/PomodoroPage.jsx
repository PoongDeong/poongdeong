import React, { useEffect, useState } from 'react';

import PomodoroTimer from '../components/PomodoroTimer';
import PomodoroUserInfo from '../components/PomodoroUserInfo';
import { postUserInfo } from "../apis/user";

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
  statement: {
    color: '#953131',
    textAlign: 'center',
    marginTop: '50px',
    fontWeight: 'bold',
  }
};

const getDataFromServer = async (setUserInfo) => {
  const token = localStorage.getItem('token');
  const userInfo = await postUserInfo(token);

  setUserInfo(userInfo);
}

export default function PomodoroPage({ isPartnerOn }) {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    getDataFromServer(setUserInfo);
  }, []);

  return (
    <div>
      <div css={styles.statement}>집중하세요! 지금 풍덩이 진행중입니다!</div>
      <PomodoroTimer isPartnerOn={isPartnerOn} />
      <div css={styles.videoBox}>
        <div css={styles.userBox}>
          <PomodoroUserInfo
            userInfo={userInfo}
          />
        </div>
        <div css={styles.userBox}>
          <PomodoroUserInfo
            userInfo={userInfo}
          />
        </div>
      </div>
    </div>
  );
}
