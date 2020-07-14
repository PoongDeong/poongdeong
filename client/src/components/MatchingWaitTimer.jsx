import React from 'react';
import {css} from "emotion";

export default function MatchingWaitTimer() {

  return (
    <div
      className={css([{
        marginBottom: '20px',
        color: '#bbdefb',
        textAlign: 'center',
      }])}>
      대기시간: 11초
    </div>
  );
}
