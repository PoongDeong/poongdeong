import React from 'react';

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
  active: {
    backgroundColor: '#1e88e5',
    color: '#FFF',
  },
};

export default function Select({ selectedValue, options, onClick }) {
  return (
    <div css={styles.box}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onClick(option)}
          css={[
            styles.button,
            option === selectedValue && styles.active,
          ]}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
