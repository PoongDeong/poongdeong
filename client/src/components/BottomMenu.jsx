import React from 'react';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import TimelineIcon from '@material-ui/icons/Timeline';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0px',
    right: '5px',
  },
});

const styles = {
  menu: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
};

export default function BottomMenu() {
  const classes = useStyles();

  return (
    <div css={styles.menu}>
      <BottomNavigation
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="매칭"
          icon={<AccessAlarmIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="내 정보"
          icon={<PermIdentityIcon />}
          component={Link}
          to="/mypage"
        />
        <BottomNavigationAction
          label="타임라인"
          icon={<TimelineIcon />}
          component={Link}
          to="/timeline"
        />
      </BottomNavigation>
    </div>
  );
}
