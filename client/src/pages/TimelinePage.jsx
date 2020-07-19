import React from 'react';
import Timeline from '@material-ui/lab/Timeline';

import BottomMenu from '../components/BottomMenu';
import TimelineList from '../components/TimelineList';

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statement: {
    color: '#953131',
    textAlign: 'center',
    marginTop: '70px',
    fontWeight: 'bold',
  },
};

export default function TimelinePage() {
  return (
    <div css={styles.box}>
      <h2>풍덩 타임라인</h2>
      <Timeline>
        <TimelineList date="2020. 7. 15." count="7" />
        <TimelineList date="2020. 7. 16." count="8" />
        <TimelineList date="2020. 7. 17." count="6" />
        <TimelineList date="2020. 7. 18." count="9" />
        <div css={styles.statement}>타임라인 서비스는 아직 준비중입니다.</div>
      </Timeline>
      <BottomMenu />
    </div>
  );
}
