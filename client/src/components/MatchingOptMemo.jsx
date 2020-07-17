import React from 'react';

const styles = {
  textarea: {
    fontSize: '12px',
    width: '220px',
    height: '50px',
    margin: '15px 15px 0px 15px',
  },
};

export default function MatchingOptMemo() {
  return (
    <div>
      <textarea css={styles.textarea} placeholder="예) 한국사 1단원 마무리" />
    </div>
  );
}
