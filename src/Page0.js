import React, { useState, useEffect, useMemo, useRef } from 'react';
// import io from 'socket.io-client';
import { io } from 'socket.io-client';
// import io from 'socket.io';
import Button from '../components/Button/Button';
import { ReactComponent as RemoveIcon } from '../images/icons/delete_sweep-24px.svg';
import { ReactComponent as RenameIcon } from '../images/icons/create-24px.svg';
import { ReactComponent as AddIcon } from '../images/icons/add-24px.svg';
import Hobbit from '../images/hobbit.jpg';
import Human from '../images/human.jpg';
import Dworf from '../images/dworf.jpg';
import Elf from '../images/elf.jpg';
import styles from '../css/Page.module.css';

export default function Page() {
  const [state, setState] = useState([]);
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
    event.data.length > 0 && setState(JSON.parse(event.data));
  });

  const clickRemoveHandler = e => {
    const li = e.target.closest('LI');
    console.log('click Remove button !!!', li.id);
  };
  const clickRenameHandler = e => {
    const li = e.target.closest('LI');
    console.log('click Rename button !!!', li.id);
  };
  const clickAddHandler = e => {
    const li = e.target.closest('LI');
    console.log('click Add button !!!', li.id);
  };

  const raceType = {
    Hobbit: Hobbit,
    Human: Human,
    Dworf: Dworf,
    Elf: Elf,
  };

  return (
    <ul className={styles.list}>
      {state.length > 0
        ? state.map(item => (
            <li className={styles.listItem} key={item.id} id={item.id}>
              <div>
                <h2>{item.race}</h2>
                <img src={raceType[item.race]} alt={item.race} />
                <Button onBtnClick={clickAddHandler}>
                  <AddIcon width="24" height="24" fill="#0ff" />
                </Button>
              </div>
              {item.name}
              <Button onBtnClick={clickRenameHandler}>
                <RenameIcon width="24" height="24" fill="#f0f" />
              </Button>
              <Button onBtnClick={clickRemoveHandler}>
                <RemoveIcon width="24" height="24" fill="#f00" />
              </Button>
            </li>
          ))
        : null}
    </ul>
  );
}
