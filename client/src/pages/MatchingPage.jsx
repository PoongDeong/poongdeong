import React, { useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import io from 'socket.io-client';

import Peer from 'simple-peer';

import CircularProgress from '@material-ui/core/CircularProgress';

import BottomMenu from '../components/BottomMenu';
import MatchingOpt from '../components/MatchingOpt';
import MatchingWaitTimer from '../components/MatchingWaitTimer';

import { get } from '../util';

import {
  setCallAccepted,
  setCallerSignal,
  setMatchingWaitingTimer,
  setSavedRoomName,
  setStream,
  toggleMatchingButton,
} from '../slice';

import PomodoroPage from './PomodoroPage';

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
  box: {
    marginTop: '10%',
    marginBottom: '10%',
    textAlign: 'center',
  },
  button: {
    width: '200px',
    height: '70px',
    fontWeight: 'bold',
    background: '#005cb2',
    color: '#ffffff',
    border: '0',
    borderRadius: '12px',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.26)',
    fontSize: '35px',
    outline: 'none',
    ':disabled': {
      background: '#005cb266',
    },
  },
  buttonPartner: {
    width: '200px',
    height: '70px',
    fontWeight: 'bold',
    background: '#005cb2',
    color: '#ffffff',
    border: '0',
    borderRadius: '12px',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.26)',
    fontSize: '15px',
    outline: 'none',
    ':disabled': {
      background: '#005cb266',
    },
  },
  activeButton: {
    width: '200px',
    height: '70px',
    background: '#005cb266',
    border: '0',
    borderRadius: '12px',
    outline: 'none',
  },
  statement: {
    position: 'absolute',
    color: 'white',
  },
  video: {
    width: '90%',
  },
  videoBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  none: {
    display: 'none',
  },
  unnone: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default function MatchingPage() {
  const dispatch = useDispatch();

  const matchingButtonState = useSelector(get('matchingButtonState'));
  const timeOption = useSelector(get('timeOption'));
  const categoryOption = useSelector(get('categoryOption'));
  const stream = useSelector(get('stream'));
  const savedRoomName = useSelector(get('savedRoomName'));
  const callerSignal = useSelector(get('callerSignal'));
  const callAccepted = useSelector(get('callAccepted'));

  const [isReady, setIsReady] = useState(false);
  const [isCall, setIsCall] = useState(false);
  const [isPartnerReady, setIsPartnerReady] = useState(false);
  const [buttonRemoved, setButtonRemoved] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  const INITIAL_SECONDS = 1;

  const turnOffMatchingButton = () => {
    dispatch(toggleMatchingButton(false));
    dispatch(setMatchingWaitingTimer(INITIAL_SECONDS));
  };

  const handleMatchingButton = () => {
    dispatch(toggleMatchingButton(true));
    dispatch(setMatchingWaitingTimer(INITIAL_SECONDS));

    const token = localStorage.getItem('token');
    socket.current = io.connect('http://localhost:3000', {
      query: `token=${token}`,
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((mediaStream) => {
        dispatch(setStream(mediaStream));
        if (userVideo.current) {
          userVideo.current.srcObject = mediaStream;
        }
      });

    socket.current.emit('match', {
      timeOption,
      categoryOption,
    });

    socket.current.on('START', ({ roomName }) => {
      turnOffMatchingButton();
      setIsReady(true);
      dispatch(setSavedRoomName(roomName));
    });

    socket.current.on('RECEIVE_CALL', ({ signal, ready }) => {
      if (ready) {
        setIsPartnerReady(true);
      }

      dispatch(setCallerSignal(signal));
    });

    socket.current.on('END', ({ matchId }) => {
      socket.current.emit('END_RESPONSE', { matchId });
    });

    socket.current.on('MATCH_END_CREATE', () => {
      socket.current.close();
    });
  };

  const handleCallButton = () => {
    setIsCall(true);

    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: 'stun:numb.viagenie.ca',
            username: 'sultan1640@gmail.com',
            credential: '98376683',
          },
          {
            urls: 'turn:numb.viagenie.ca',
            username: 'sultan1640@gmail.com',
            credential: '98376683',
          },
        ],
      },
      stream,
    });

    peer.on('signal', (data) => {
      socket.current.emit('CALL_USER', {
        roomName: savedRoomName,
        signal: data,
      });
    });

    peer.on('stream', (partnerStream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = partnerStream;
        setButtonRemoved(true);
      }
    });

    socket.current.on('CALL_ACCEPTED', (signal) => {
      dispatch(setCallAccepted(true));
      peer.signal(signal);
    });
  };

  const handleAcceptButton = () => {
    setButtonRemoved(true);

    dispatch(setCallAccepted(true));

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.current.emit('ACCEPT_CALL', {
        roomName: savedRoomName,
        signal,
      });
    });

    peer.on('stream', (partnerStream) => {
      partnerVideo.current.srcObject = partnerStream;
    });

    peer.signal(callerSignal);
  };

  let UserVideo;
  if (stream) {
    UserVideo = (
      <video
        css={styles.video}
        playsInline
        muted
        ref={userVideo}
        autoPlay
      />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video
        css={styles.video}
        playsInline
        muted
        ref={partnerVideo}
        autoPlay
      />
    );
  }

  const showButton = () => {
    if (buttonRemoved) {
      return <div />;
    }

    if (isPartnerReady) {
      return (
        <button
          css={styles.button}
          onClick={handleAcceptButton}
          type="button"
        >
          준비 완료!
        </button>
      );
    }

    if (isCall) {
      return (
        <button
          css={styles.buttonPartner}
          type="button"
        >
          파트너의 준비를 기다리는 중입니다.
        </button>
      );
    }

    if (isReady) {
      return (
        <button
          css={styles.button}
          onClick={handleCallButton}
          type="button"
        >
          준비 완료!
        </button>
      );
    }

    if (matchingButtonState) {
      return (
        <button
          onClick={turnOffMatchingButton}
          css={styles.activeButton}
          type="button"
        >
          <div css={styles.statement}>
            상대를 찾는 중입니다.
            <br />
            취소하시려면 한 번 더 눌러주세요.
          </div>
          <CircularProgress />
        </button>
      );
    }

    if (!matchingButtonState) {
      return (
        <button
          onClick={handleMatchingButton}
          css={styles.button}
          type="button"
          disabled={!timeOption || !categoryOption}
        >
          매칭시작
        </button>
      );
    }

    return <div />;
  };

  return (
    <div css={styles.main}>
      {buttonRemoved
        ? <PomodoroPage />
        : (
          <div css={styles.option}>
            <MatchingOpt />
          </div>
        )}
      <div css={styles.box}>
        {showButton()}
      </div>
      <MatchingWaitTimer />
      <div>
        <div css={styles.videoBox}>
          <span css={partnerVideo.current ? styles.unnone : styles.none}>
            {UserVideo}
          </span>
          <span>
            {PartnerVideo}
          </span>
        </div>
      </div>
      <BottomMenu />
    </div>
  );
}
