import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadData } from '../redux/raceOperations';
import ListItem from '../components/ListItem/ListItem';
import styles from './Page.module.css';

const raceTypes = ['Hobbit', 'Human', 'Dworf', 'Elf'];

export default function Page() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.race.items);
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
    //   cleanup - close connection
    // }
  }, [socket]);

  // Listen for messages
  socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    event.data.length > 0 && dispatch(loadData(JSON.parse(event.data)));
  });

  return (
    <ul className={styles.list}>
      {raceTypes.length > 0
        ? raceTypes.map((race, idx) => (
            <div key={idx} className={styles.raceBlock}>
              <h2 className={styles.raceName}>{race}</h2>
              <ul className={styles.raceList}>
                {state.length > 0
                  ? state.map(item =>
                      race === item.race ? (
                        <ListItem key={item.id} item={item} />
                      ) : null,
                    )
                  : null}
              </ul>
            </div>
          ))
        : null}
    </ul>
  );
}
