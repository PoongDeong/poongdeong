import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setMatchingTimer } from '../slice';

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

  const matchingTimer = useSelector((state) => state.matchingTimer);
  const isMatchingButtonClicked = useSelector((state) => state.isMatchingButtonClicked);

  const DECI_SECOND = 0.1;

  if (isMatchingButtonClicked) {
    const intervalTimer = setInterval(() => {
      dispatch(setMatchingTimer(matchingTimer + DECI_SECOND));
      clearInterval(intervalTimer);
    }, 100);
  }

  return (
    <div>
      {isMatchingButtonClicked
        ? (
          <div css={styles.text}>
            대기시간:
            {' '}
            {matchingTimer.toFixed(1)}
            초
          </div>
        )
        : <div />}
    </div>

  );
}
