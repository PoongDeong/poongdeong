import React, { useEffect, useState, useRef } from 'react';

import io from 'socket.io-client';

import Peer from 'simple-peer';

const styles = {
  box: {
    width: '200px',
    height: '200px',
    border: '1px solid',
  },
};

export default function MatchingSystem() {
  const [stream, setStream] = useState();
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [savedRoomName, setSavedRoomName] = useState('');

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    const token = localStorage.getItem('token');
    socket.current = io.connect('http://localhost:3000', {
      query: `token=${token}`,
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    socket.current.on('CREATE_ROOM', () => {
      console.log('<Room is created>');
    });

    socket.current.emit('match', {
      timeOption: '50분',
      categoryOption: '공부',
    });

    socket.current.on('START', ({ matchedId, roomName }) => {
      console.log('START');

      setSavedRoomName(roomName);
    });

    socket.current.on('RECEIVE_CALL', ({ signal }) => {
      console.log('RECEIVE_CALL');

      setCallerSignal(signal);
    });

    socket.current.on('END', ({ matchId }) => {
      console.log('END');

      socket.current.emit('END_RESPONSE', { matchId });
    });

    socket.current.on('MATCH_END_CREATE', () => {
      console.log('MATCH_END_CREATE');

      socket.current.close();
    });
  }, []);

  const handleCallButton = () => {
    console.log('Call button is clicked');

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
      console.log('Send signal to otherUser');

      socket.current.emit('CALL_USER', {
        roomName: savedRoomName,
        signal: data,
      });
    });

    peer.on('stream', (stream) => {
      console.log('Get stream from otherUser, and append to partnerVideo');

      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on('CALL_ACCEPTED', (signal) => {
      console.log('CALL_ACCEPTED');

      setCallAccepted(true);
      peer.signal(signal);
    });
  };

  const handleMatchingButton = () => {
    console.log('Mtching button is clicked');

    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      console.log('Send ACCEPT_CALL');

      socket.current.emit('ACCEPT_CALL', {
        roomName: savedRoomName,
        signal,
      });
    });

    peer.on('stream', (stream) => {
      console.log('Get stream from otherUser, and append to partnerVideo');

      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  };

  let UserVideo;
  if (stream) {
    UserVideo = (
      <video
        css={styles.box}
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
        css={styles.box}
        playsInline
        muted
        ref={partnerVideo}
        autoPlay
      />
    );
  }

  return (
    <div>
      <div>
        <button type="button" onClick={handleCallButton}>call</button>
        <button type="button" onClick={handleMatchingButton}>matching</button>
        {UserVideo}
        {PartnerVideo}
      </div>
    </div>
  );
}
