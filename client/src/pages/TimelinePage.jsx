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
};

export default function TimelinePage() {
  return (
    <div css={styles.box}>
      <h2>풍덩 타임라인</h2>
      <Timeline>
        <TimelineList date="2020. 7. 15." count="3" category="개발" />
        <TimelineList date="2020. 7. 16." count="2" category="독서" />
      </Timeline>
      <BottomMenu />
    </div>
  );
}
