import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { raceSlice } from './raceReducer';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
    //  {
    //   ignoredActions: [
    //     FLUSH,
    //     REHYDRATE,
    //     PAUSE,
    //     PERSIST,
    //     PURGE,
    //     REGISTER,
    //     'race/addRaceItem',
    //     'race/changingIsRun',
    //     'race/deleteItem',
    //   ],
    // },
  }),
];

const rootReducer = combineReducers({
  [raceSlice.name]: raceSlice.reducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
  middleware,
});

export default store;
// export const persistor = persistStore(store);
