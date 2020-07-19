import React, { useState } from 'react';

import { useSelector } from 'react-redux';

const styles = {
  box: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  text: {
    border: '7px solid #2d76b1',
    color: '#3d53b4',
    width: '90%',
    fontSize: '80px',
    display: 'flex',
    justifyContent: 'center',
    height: '120px',
    fontWeight: 'bold',
  },
};

export default function PomodoroTimer({ isPartnerOn }) {
  const timeOption = useSelector((state) => state.timeOption);

  const initialTime = timeOption === '50분' ? 10 : Number(timeOption.replace(/[분]/g, "")) * 60;
  const [timer, setTimer] = useState(initialTime)

  const intervalTimer = setInterval(() => {
    setTimer(timer - 1);

    clearInterval(intervalTimer);
  }, 1000);

  return (
    <div css={styles.box}>
      <div css={styles.text}>
        {Math.floor(timer / 60)} : {(timer % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
}
