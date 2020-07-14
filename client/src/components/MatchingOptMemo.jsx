import React from 'react';

import { css } from 'emotion';

export default function MatchingOptMemo() {
  return (
    <div>
      <textarea
        className={css([{
          fontSize: '18px',
        }])}
        placeholder="목표를 작성해주세요" />
    </div>
  );
}
