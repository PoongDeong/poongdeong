import React from 'react';

import MatchingOptMemo from './MatchingOptMemo';
import TimeOptionContainer from './TimeOptionContainer';
import CategoryOptionContainer from './CategoryOptionContainer';

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: '10px',
    borderRadius: '10px',
    float: 'left',
    width: '90%',
    marginTop: '50px',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
};

export default function MatchingOpt() {
  return (
    <div css={styles.box}>
      <div css={styles.radio}>
        <span css={styles.subtitle}>시간</span>
        <TimeOptionContainer />
        <span css={styles.subtitle}>무엇에 빠지실건가요?</span>
        <CategoryOptionContainer />
        <span css={styles.subtitle}>목표를 작성하세요</span>
        <MatchingOptMemo />
      </div>
    </div>
  );
}
