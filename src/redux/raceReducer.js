import { createSlice } from '@reduxjs/toolkit';

const state = {
  items: [],
};

export const raceSlice = createSlice({
  name: 'race',
  initialState: state,
  reducers: {
    loadData: (state, { payload }) => ({
      items: [...payload],
    }),
    addRaceItem: (state, { payload }) => ({
      ...state,
      items: [payload, ...state.items],
    }),
    renameItem: (state, { payload }) => ({
      ...state,
      items: [
        ...state.items.map(item =>
          item.id === +payload.id ? { ...item, name: payload.name } : item,
        ),
      ],
    }),
    deleteItem: (state, { payload }) => ({
      ...state,
      items: [...state.items.filter(item => item.id !== payload)],
    }),
  },
});
