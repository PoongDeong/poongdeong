import React, {useState} from 'react';
import {css} from "emotion";

export default function MatchingOptCheckBox({selection, info}) {

  return (
    <div
      className={css([{
        margin: '15px'
      }])}>
      {selection.map(v =>
        <span>
          <label>
            <button
              className={css([{
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
                }
              }])}
            >{v}</button>
            <input type="radio" name={info}
              className={css([{
                display: 'none'
              }])}
            />
          </label>

        </span>
      )}
    </div>
  );
}
