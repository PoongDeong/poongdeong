import React from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import BottomMenu from '../components/BottomMenu';

import { toggleLoginState } from '../slice';

const styles = {
  main: {
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    height: '100%',
    padding: '15px',
  },
  profile: {
    width: '150px',
    height: '150px',
    borderRadius: '5px',
  },
  crown: {
    width: '20px',
    height: '16px',
  },
  logoutButton: {
    padding: '8px 48px',
    fontWeight: 'bold',
    background: '#b54646',
    color: '#ffffff',
    border: '0',
    borderRadius: '12px',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.26)',
    outline: 'none',
    marginTop: '50px',
  },
  table: {
    display: 'flex',
    width: '250px',
    fontSize: '19px',
  },
  infoTitle: {
    fontWeight: 'bold',
    margin: '20px 10px 20px 43px',
    textAlign: 'right',
  },
  infoData: {
    margin: '20px 5px 20px 5px',
  },
};

export default function MyPage() {
  const history = useHistory();

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(toggleLoginState());
    history.push('/');
  };

  return (
    <div css={styles.main}>
      <div>
        <img
          css={styles.crown}
          src="../src/images/crown.png"
          alt="crown"
        />
        <span>랭킹 : 20 위</span>
      </div>
      <img
        css={styles.profile}
        src="../src/images/default-image.jpeg"
        alt="profile"
      />
      <div css={styles.table}>
        <div css={styles.infoTitle}>
          <div>아이디</div>
          <div>닉네임</div>
          <div>풍덩 횟수</div>
        </div>
        <div css={styles.infoData}>
          <div>test</div>
          <div>풍덩</div>
          <div>20 회</div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        css={styles.logoutButton}
        type="button"
      >
        로그아웃
      </button>
      <BottomMenu />
    </div>
  );
}
