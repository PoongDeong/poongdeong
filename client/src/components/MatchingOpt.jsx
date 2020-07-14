import React, {useState} from 'react';

import {css} from 'emotion';

import MatchingOptCheckBox from "./MatchingOptCheckBox";
import MatchingOptMemo from "./MatchingOptMemo";

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: '10px',
    width: '100%',
    borderRadius: '10px'
  },
  button: {
    width: '200px',
    height: '40px',
    background: '#004ba0',
    color: '#bbdefb'
  },
}


function MatchingOpt() {
  return (
    <div
      className={styles.box}>
      <div
        className={css([
          {
            float: 'left',
            width: '80%',
            marginTop: '10px',
            marginBottom: '20px'
          }
        ])}
      >
        <hr></hr>
        <span>시간</span>
        <MatchingOptCheckBox selection={['25분', '50분']} info={"time_info"}/>
        <hr></hr>
        <span>무엇에 빠지실건가요?</span>
        <MatchingOptCheckBox selection={['공부', '코딩', '독서']} info={"category_info"}/>
        <hr></hr>
      </div>
      <span>목표를 작성하세요</span>
      <MatchingOptMemo/>
    </div>
  );
}

export default MatchingOpt;
