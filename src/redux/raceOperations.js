import { raceSlice } from './raceReducer';
// import deltaTime from '../helpers/deltaTime';

const loadData = data => (dispatch, getState) => {
  // console.log('In Operations!!! -> loadData : ', data);
  dispatch(raceSlice.actions.loadData(data));
};

const addItem = data => (dispatch, getState) => {
  console.log('In Operations!!! -> click Add button : ', data);
  // dispatch(raceSlice.actions.addRaceItem(data));
};

const renameItem = data => (dispatch, getState) => {
  dispatch(raceSlice.actions.renameItem(data));
};

const removeItem = id => (dispatch, getState) => {
  console.log('In Operations!!! -> click Remove button !!!', id);
  dispatch(raceSlice.actions.deleteItem(id));
};

export { loadData, addItem, renameItem, removeItem };
