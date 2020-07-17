import React from 'react';

import BottomMenu from '../components/BottomMenu';
import MatchingButton from '../components/MatchingButton';
import MatchingOpt from '../components/MatchingOpt';
import MatchingWaitTimer from '../components/MatchingWaitTimer';

const styles = {
  main: {
    background: 'white',
    height: '100%',
    padding: '15px',
  },
  option: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default function MatchingPage() {
  return (
    <div css={styles.main}>
      <div css={styles.option}>
        <MatchingOpt />
      </div>
      <MatchingButton />
      <MatchingWaitTimer />
      <BottomMenu />
    </div>
  );
}
