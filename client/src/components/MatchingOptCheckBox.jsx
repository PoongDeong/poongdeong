import React from 'react';

const styles = {
  box: {
    margin: '15px',
  },
  button: {
    margin: '0',
    padding: '.75em 1.5em',
    boxSizing: 'border-box',
    position: 'relative',
    display: 'inline-block',
    border: 'solid 1px #DDD',
    backgroundColor: '#FFF',
    lineHeight: '140%',
    textAlign: 'center',
    boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
    transition: 'border-color .15s ease-out,  color .25s ease-out,  background-color .15s ease-out, box-shadow .15s ease-out',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#4B9DEA',
      color: '#FFF',
      boxShadow: '0 0 10px rgba(102, 179, 251, 0.5)',
      borderColor: '#4B9DEA',
      zIndex: '1',
    },
  },
  radio: {
    display: 'none',
  },
};

export default function MatchingOptCheckBox({ selection, info }) {
  return (
    <div css={styles.box}>
      {selection.map((v) => (
        <span key={v}>
          <label htmlFor={v}>
            <button css={styles.button} type="button">{v}</button>
          </label>

          <input id={v} type="radio" name={info} css={styles.radio} />
        </span>
      ))}
    </div>
  );
}
