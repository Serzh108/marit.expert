import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadData } from '../redux/raceOperations';
// import io from 'socket.io-client';
import { io } from 'socket.io-client';
// import io from 'socket.io';
import ListItem from '../components/ListItem/ListItem';
import styles from '../css/Page.module.css';

export default function Page() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.race.items);

  // const socket = io('http://testapi.marit.expert:3004');

  const ref = useRef([]);

  useMemo(() => {
    ref.current = new WebSocket('ws://testapi.marit.expert:3004');
  }, [ref]);

  const socket = ref.current;

  useEffect(() => {
    socket.addEventListener('open', function (event) {
      socket.send({ cmd: 'get_list' });
    });
    // return () => {
    //   cleanup
    // }
  }, [socket]);

  // Create WebSocket connection.
  // const socket = new WebSocket('ws://testapi.marit.expert:3004');

  // Connection opened
  // socket.addEventListener('open', function (event) {
  //   socket.send({ cmd: 'get_list' });
  // });

  // Listen for messages
  socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    event.data.length > 0 && dispatch(loadData(JSON.parse(event.data)));
  });

  return (
    <ul className={styles.list}>
      {state.length > 0
        ? state.map(item => <ListItem key={item.id} item={item} />)
        : null}
    </ul>
  );
}
