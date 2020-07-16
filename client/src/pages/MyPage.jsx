import React from 'react';

import BottomMenu from '../components/BottomMenu';

const styles = {
  main: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    height: '100%',
    padding: '15px',
  },
  profile: {
    border: '1px solid gray',
    width: '150px',
    height: '150px',
  },

};

export default function MyPage() {
  return (
    <div css={styles.main}>
      <div>랭킹</div>
      <div css={styles.profile}>프로필 사진</div>
      <div>닉네임</div>
      <div>총 풍덩 시간 : 250 시간</div>
      <div>히스토리</div>
      <BottomMenu />
    </div>
  );
}
