import React, { useState } from 'react';
import { io } from 'socket.io-client';
// import io from 'socket.io';
import Button from '../components/Button/Button';
import { ReactComponent as RemoveIcon } from '../assets/images/icons/delete_sweep-24px.svg';
import { ReactComponent as RenameIcon } from '../assets/images/icons/create-24px.svg';
import { ReactComponent as AddIcon } from '../assets/images/icons/add-24px.svg';
// import { ReactComponent as SaveIcon } from '../assets/images/icons/save-24px.svg';
import Hobbit from '../assets/images/hobbit.jpg';
import Human from '../assets/images/human.jpg';
import Dworf from '../assets/images/dworf.jpg';
import Elf from '../assets/images/elf.jpg';
import styles from './Page.module.css';

const raceType = {
  Hobbit: Hobbit,
  Human: Human,
  Dworf: Dworf,
  Elf: Elf,
};

export default function Page() {
  const [state, setState] = useState([]);
  // const socket = io('http://testapi.marit.expert:3004');
  const socket = io('http://testapi.marit.expert:3004', {
    transports: ['websocket'],
  });

  // socket.send({ cmd: 'get_list' });
  // socket.onmessage = message => {
  //   console.log('message = ', message);
  // };

  socket.emit({ cmd: 'get_list' });
  socket.on('message', message => {
    console.log('message = ', message.data);
  });
  // =====-!=!-=====

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
