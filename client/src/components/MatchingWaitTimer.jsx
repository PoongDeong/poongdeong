import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setMatchingWaitingTimer } from '../slice';

const styles = {
  text: {
    marginBottom: '10px',
    color: '#005cb2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default function MatchingWaitTimer() {
  const dispatch = useDispatch();

  const matchingWaitingTimer = useSelector((state) => state.matchingWaitingTimer);
  const matchingButtonState = useSelector((state) => state.matchingButtonState);

  const WAITING_TIME_TO_ADD = 0.1;

  if (matchingButtonState) {
    const intervalTimer = setInterval(() => {
      dispatch(setMatchingWaitingTimer(matchingWaitingTimer + WAITING_TIME_TO_ADD));
      clearInterval(intervalTimer);
    }, 100);
  }

  return (
    <div>
      {matchingButtonState
        ? (
          <div css={styles.text}>
            대기시간:
            {' '}
            {matchingWaitingTimer.toFixed(1)}
            초
          </div>
        )
        : <div />}
    </div>

  );
}
