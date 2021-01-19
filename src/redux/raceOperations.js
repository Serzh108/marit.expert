import { raceSlice } from './raceReducer';

// const testData = [
//   { id: 1, name: 'Frodo', race: 'Hobbit' },
//   { id: 2, name: 'Aragorn', race: 'Human' },
//   { id: 3, name: 'Gimli', race: 'Dworf' },
//   { id: 4, name: 'Legolas', race: 'Elf' },
//   { id: 5, name: 'Sam', race: 'Hobbit' },
//   { id: 6, name: 'Boromir', race: 'Human' },
//   { id: 7, name: 'Toreen', race: 'Dworf' },
//   { id: 8, name: 'Arven', race: 'Elf' },
//   { id: 9, name: 'Galadriel', race: 'Elf' },
// ];

const loadData = data => (dispatch, getState) => {
  // console.log('In Operations!!! -> loadData : ', data);
  dispatch(raceSlice.actions.loadData(data));
  // dispatch(raceSlice.actions.loadData(testData));
};

const addItem = data => (dispatch, getState) => {
  console.log('In Operations!!! -> click Add button : ', data);
  alert("we don't use this function yet"); // temp!
  // dispatch(raceSlice.actions.addRaceItem(data));
};

const renameItem = data => (dispatch, getState) => {
  dispatch(raceSlice.actions.renameItem(data));
};

const removeItem = id => (dispatch, getState) => {
  // console.log('In Operations!!! -> click Remove button !!!', id);
  dispatch(raceSlice.actions.deleteItem(id));
};

export { loadData, addItem, renameItem, removeItem };
