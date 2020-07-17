import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import { toggleMatchingButton, setMatchingWaitingTimer } from '../slice';

const styles = {
  box: {
    marginTop: '10%',
    marginBottom: '10%',
    textAlign: 'center',
  },
  button: {
    width: '200px',
    height: '70px',
    fontWeight: 'bold',
    background: '#005cb2',
    color: '#ffffff',
    border: '0',
    borderRadius: '12px',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.26)',
    fontSize: '35px',
    outline: 'none',
  },
  activeButton: {
    width: '200px',
    height: '70px',
    background: '#005cb266',
    border: '0',
    borderRadius: '12px',
    outline: 'none',
  },
  statement: {
    position: 'absolute',
    color: 'white',
  },
};

function MatchingButton() {
  const matchingButtonState = useSelector((state) => state.matchingButtonState);
  const dispatch = useDispatch();

  const INITIAL_SECOND = 1;

  const changeState = () => {
    dispatch(toggleMatchingButton());
    dispatch(setMatchingWaitingTimer(INITIAL_SECOND));
  };

  return (
    <div>
      <div css={styles.box}>
        {matchingButtonState
          ? (
            <button
              onClick={changeState}
              css={styles.activeButton}
              type="button"
            >
              <div css={styles.statement}>
                상대를 찾는 중입니다.
                <br />
                취소하시려면 한 번 더 눌러주세요.
              </div>
              <CircularProgress />
            </button>
          )
          : (
            <button
              onClick={changeState}
              css={styles.button}
              type="button"
            >
              매칭시작
            </button>
          )}
      </div>
    </div>
  );
}

export default MatchingButton;
