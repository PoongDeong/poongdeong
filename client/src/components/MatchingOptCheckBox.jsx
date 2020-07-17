import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryOption, setTimeOption } from '../slice';

const styles = {
  box: {
    margin: '15px',
  },
  button: {
    margin: '0',
    fontSize: '15px',
    padding: '.75em 1.5em',
    boxSizing: 'border-box',
    position: 'relative',
    display: 'inline-block',
    border: 'solid 1px #DDD',
    backgroundColor: '#FFF',
    lineHeight: '140%',
    textAlign: 'center',
    transition: 'border-color .15s ease-out,  color .25s ease-out,  background-color .15s ease-out, box-shadow .15s ease-out',
    cursor: 'pointer',
    outline: 'none',
  },
  activeButton: {
    margin: '0',
    fontSize: '15px',
    padding: '.75em 1.5em',
    boxSizing: 'border-box',
    position: 'relative',
    display: 'inline-block',
    border: 'solid 1px #DDD',
    backgroundColor: '#9a9a9a',
    color: '#FFF',
    lineHeight: '140%',
    textAlign: 'center',
    transition: 'border-color .15s ease-out,  color .25s ease-out,  background-color .15s ease-out, box-shadow .15s ease-out',
    cursor: 'pointer',
    outline: 'none',
  },
};

export default function MatchingOptCheckBox({ selection, info }) {
  const dispatch = useDispatch();
  const selector = useSelector((v) => v);

  const handleRadio = (e) => {
    if (info === 'timeOption') {
      dispatch(setTimeOption(e.target.value));
    }
    if (info === 'categoryOption') {
      dispatch(setCategoryOption(e.target.value));
    }
  };

  return (
    <div css={styles.box}>
      {selection.map((v) => (
        <span key={v}>
          {v !== selector[info]
            ? (
              <button
                onClick={(e) => handleRadio(e)}
                css={styles.button}
                type="button"
                value={v}
              >
                {v}
              </button>
            )
            : (
              <button
                onClick={(e) => handleRadio(e)}
                css={styles.activeButton}
                type="button"
                value={v}
              >
                {v}
              </button>
            )}
        </span>
      ))}
    </div>
  );
}
