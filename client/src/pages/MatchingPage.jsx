import React from 'react';

import MenuPage from "./MenuPage";
import MatchingBtn from "../components/MatchingBtn";
import MatchingOpt from "../components/MatchingOpt";
import MatchingWaitTimer from "../components/MatchingWaitTimer";
import {useDispatch, useSelector} from "react-redux";
import {setIsMenuOn} from "../slice";

const styles = {
  main: {
    background: 'white',
    height: '100%',
    padding: '15px',
  },
  option: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}

export default function MatchingPage() {
  const dispatch = useDispatch();
  const isMenuOn = useSelector(state => state.isMenuOn);

  const openMenu = () => {
    dispatch(setIsMenuOn());
  }

  return (
    <div css={styles.main}>
      <div>
        <button onClick={openMenu}>메뉴</button>
        {isMenuOn ? <MenuPage /> : <></>}
      </div>
      <div css={styles.option}>
        <MatchingOpt />
      </div>
      <MatchingWaitTimer />
      <MatchingBtn />
    </div>
  )
}
