import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadData,
  addItem,
  renameItem,
  removeItem,
} from '../redux/raceOperations';
// import io from 'socket.io-client';
import { io } from 'socket.io-client';
// import io from 'socket.io';
import ListItem from '../components/ListItem/ListItem';
import Button from '../components/Button/Button';
import { ReactComponent as RemoveIcon } from '../images/icons/delete_sweep-24px.svg';
import { ReactComponent as RenameIcon } from '../images/icons/create-24px.svg';
import { ReactComponent as AddIcon } from '../images/icons/add-24px.svg';
import Hobbit from '../images/hobbit.jpg';
import Human from '../images/human.jpg';
import Dworf from '../images/dworf.jpg';
import Elf from '../images/elf.jpg';
import styles from '../css/Page.module.css';

const raceType = {
  Hobbit: Hobbit,
  Human: Human,
  Dworf: Dworf,
  Elf: Elf,
};

export default function Page() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.race.items);
  const initialNames = state.length > 0 && state.map(item => item.name);
  const [name, setName] = useState([]);
  const [isSetNewName, setIsSetNewName] = useState(false);
  const [changedNameId, setchangedNameId] = useState();
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

  const clickAddHandler = e => {
    const li = e.target.closest('LI');
    console.log('click Add button !!!', li.id);
    const data = 'test data!!!';
    dispatch(addItem(data));
  };

  const clickRemoveHandler = e => {
    const li = e.target.closest('LI');
    dispatch(removeItem(+li.id));
  };

  const clickRenameHandler = e => {
    const li = e.target.closest('LI');
    setchangedNameId(li.id);
    setIsSetNewName(true);
    setName(initialNames);
  };

  const changeNameSubmit = e => {
    e.preventDefault();
    dispatch(renameItem({ id: changedNameId, name: name[changedNameId - 1] }));
    setIsSetNewName(false);
  };

  const inputHandler = e => {
    const li = e.target.closest('LI');
    const value = e.target.value;
    const newNames = [...name];
    newNames[li.id - 1] = value;
    setName([...newNames]);
  };

  const selectedItem = currentId => {
    const checkId = +changedNameId === currentId;
    return checkId && isSetNewName;
  };

  return (
    <ul className={styles.list}>
      {state.length > 0
        ? state.map(item => (
            <ListItem key={item.id} item={item} />
            // <li className={styles.listItem} key={item.id} id={item.id}>
            //   <div>
            //     <h2>{item.race}</h2>
            //     <img src={raceType[item.race]} alt={item.race} />
            //     <Button onBtnClick={clickAddHandler}>
            //       <AddIcon width="24" height="24" fill="#0ff" />
            //     </Button>
            //   </div>
            //   {item.name}
            //   {selectedItem(item.id) ? (
            //     <form onSubmit={changeNameSubmit}>
            //       <input
            //         className={styles.nameInput}
            //         type="text"
            //         name="name"
            //         value={name[item.id - 1]}
            //         onChange={inputHandler}
            //       />
            //       <button type="submit" value="Ok" />
            //     </form>
            //   ) : (
            //     <Button onBtnClick={clickRenameHandler}>
            //       <RenameIcon width="24" height="24" fill="#f0f" />
            //     </Button>
            //   )}
            //   <Button onBtnClick={clickRemoveHandler}>
            //     <RemoveIcon width="24" height="24" fill="#f00" />
            //   </Button>
            // </li>
          ))
        : null}
    </ul>
  );
}
