import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { raceSlice } from './raceReducer';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

const rootReducer = combineReducers({
  [raceSlice.name]: raceSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
