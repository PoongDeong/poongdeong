import React from 'react';

const styles = {
  textarea: {
    fontSize: '18px',
  }
}

export default function MatchingOptMemo() {
  return (
    <div>
      <textarea css={styles.textarea} placeholder="목표를 작성해주세요" />
    </div>
  );
}
