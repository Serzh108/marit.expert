import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, renameItem, removeItem } from '../../redux/raceOperations';
import Button from '../Button/Button';
import hideIcon from '../../helper/hideIcon';
import { ReactComponent as RemoveIcon } from '../../assets/images/icons/delete_sweep-24px.svg';
import { ReactComponent as RenameIcon } from '../../assets/images/icons/create-24px.svg';
import { ReactComponent as AddIcon } from '../../assets/images/icons/add-24px.svg';
import { ReactComponent as SaveIcon } from '../../assets/images/icons/save-24px.svg';
import Hobbit from '../../assets/images/hobbit.jpg';
import Human from '../../assets/images/human.jpg';
import Dworf from '../../assets/images/dworf.jpg';
import Elf from '../../assets/images/elf.jpg';
import styles from './ListItem.module.css';

const raceType = {
  Hobbit: Hobbit,
  Human: Human,
  Dworf: Dworf,
  Elf: Elf,
};

export default function ListItem({ item, socket }) {
  const dispatch = useDispatch();
  const state = useSelector(state => state.race.items);
  const initialNames =
    state.length > 0 &&
    state.reduce((acc, item) => {
      acc[item.id] = item.name;
      return acc;
    }, {});
  const [name, setName] = useState({});
  const [isSetNewName, setIsSetNewName] = useState(false);
  const [changedNameId, setchangedNameId] = useState();

  const clickAddHandler = e => {
    const li = e.target.closest('LI');
    console.log('click Add button !!! id: ', li.id);
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
    dispatch(renameItem({ id: changedNameId, name: name[changedNameId] }));
    setIsSetNewName(false);
  };

  const inputHandler = e => {
    const li = e.target.closest('LI');
    const value = e.target.value;
    setName(prev => ({ ...prev, [li.id]: value }));
  };

  const selectedItem = currentId => {
    const checkId = +changedNameId === currentId;
    return checkId && isSetNewName;
  };

  return (
    <li className={styles.listItem} key={item.id} id={item.id}>
      <div>
        <img src={raceType[item.race]} alt={item.race} />
        <Button onBtnClick={clickAddHandler}>
          <AddIcon width="24" height="24" fill="#3f6caf" />
        </Button>
      </div>
      <h3>{item.name}</h3>
      {selectedItem(item.id) ? (
        <form onSubmit={changeNameSubmit} className={styles.form}>
          <input
            className={styles.nameInput}
            type="text"
            value={name[item.id]}
            onChange={inputHandler}
          />
          {hideIcon() && (
            <button type="submit" className={styles.btn}>
              <SaveIcon width="24" height="24" fill="#3f6caf" />
            </button>
          )}
        </form>
      ) : (
        <Button onBtnClick={clickRenameHandler}>
          <RenameIcon width="24" height="24" fill="#3f6caf" />
        </Button>
      )}
      <Button onBtnClick={clickRemoveHandler}>
        <RemoveIcon width="24" height="24" fill="#f00" />
      </Button>
    </li>
  );
}
