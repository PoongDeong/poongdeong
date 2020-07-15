import React from 'react';

import MatchingOptCheckBox from './MatchingOptCheckBox';
import MatchingOptMemo from './MatchingOptMemo';

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: '10px',
    width: '100%',
    borderRadius: '10px',
  },
  radio: {
    float: 'left',
    width: '80%',
    marginTop: '10px',
    marginBottom: '20px',
  },
};

export default function MatchingOpt() {
  return (
    <div css={styles.box}>
      <div css={styles.radio}>
        <hr />
        <span>시간</span>
        <MatchingOptCheckBox selection={['25분', '50분']} info="time_info" />
        <hr />
        <span>무엇에 빠지실건가요?</span>
        <MatchingOptCheckBox selection={['공부', '코딩', '독서']} info="category_info" />
        <hr />
      </div>
      <span>목표를 작성하세요</span>
      <MatchingOptMemo />
    </div>
  );
}
