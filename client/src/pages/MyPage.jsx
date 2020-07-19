import React from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';

import {
  toggleLoginState, setProfileImage, setUserEmail, setUserNickName,
} from '../slice';

import BottomMenu from '../components/BottomMenu';
import UploadProfileImage from '../components/UploadProfileImage';

import { getUserImage, postUserInfo } from '../apis/user';

const styles = {
  main: {
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',

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
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 100px)',
    textAlign: 'center',
    fontSize: '19px',
    marginTop: '20px',
  },
  title: {
    fontWeight: 'bold',
  },
};

export default function MyPage() {
  const history = useHistory();

  const dispatch = useDispatch();

  const { profileImage, email, nickname } = useSelector((state) => state.userFields);

  const alertError = async (errorMessage) => {
    await Swal.fire({ icon: 'error', text: errorMessage });
  };

  (async () => {
    try {
      const userInfo = await postUserInfo();
      await dispatch(setUserEmail(userInfo.email));
      await dispatch(setUserNickName(userInfo.nickname));
    } catch {
      await alertError('사용자 정보를 불러오지 못했습니다');
      history.push('/');
      return;
    }

    try {
      const userImageUrl = await getUserImage();
      await dispatch(setProfileImage(userImageUrl));
    } catch {
      await alertError('기존 프로필을 업로드하지 못했습니다');
    }
  })();

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
        <span>랭킹 : - 위</span>
      </div>
      <img
        css={styles.profile}
        src={profileImage}
        alt="profile"
      />
      <UploadProfileImage />
      <div css={styles.content}>
        <div css={styles.title}>
          <div>아이디</div>
          <div>닉네임</div>
          <div>풍덩 횟수</div>
        </div>
        <div>
          <div>{email}</div>
          <div>{nickname}</div>
          <div>- 회</div>
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
