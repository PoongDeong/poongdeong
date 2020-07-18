import React, { useEffect, useState, useRef } from 'react';

import io from 'socket.io-client';

import Peer from 'simple-peer';

const styles = {
  box: {
    width: '200px',
    height: '200px',
  },
};

export default function MatchingSystem() {
  const [yourID, setYourID] = useState('');
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect('/');
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket.current.on('yourID', (id) => {
      setYourID(id);
    });

    socket.current.on('woomin', (users) => {
      setUsers(users);
    });

    socket.current.on('hey', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  const callPeer = (id) => {
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
      socket.current.emit('callUser', { userToCall: id, signalData: data, from: yourID });
    });

    peer.on('stream', (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on('callAccepted', (signal) => {
      console.log('signal', signal);
      setCallAccepted(true);
      peer.signal(signal);
    });
  };

  const acceptCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      console.log('signal', data);
      socket.current.emit('acceptCall', { signal: data, to: caller });
    });

    peer.on('stream', (stream) => {
      console.log('stream', stream);
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  };

  let UserVideo;
  if (stream) {
    UserVideo = (
      <video css={styles.box} playsInline muted ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>
          {caller}
          {' '}
          is calling you
        </h1>
        <button type="button" onClick={acceptCall}>Accept</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>
          {UserVideo}
          {PartnerVideo}
        </div>
        <div>
          {Object.keys(users).map((key) => {
            if (key === yourID) {
              return null;
            }
            return (
              <button onClick={() => callPeer(key)}>
                Call
                {key}
              </button>
            );
          })}
        </div>
        <div>
          {incomingCall}
        </div>
      </div>
    </div>
  );
}
