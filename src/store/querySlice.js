import { createSlice } from '@reduxjs/toolkit';

export const querySlice = createSlice({
  name: 'query',
  initialState: {
    value: [],
  },
  reducers: {
    addQuery: (state, action) => {
      state.value.push(action.payload);
    },
    clearAllQuery: (state) => {
      state.value = [];
    },
  },
});

export const { addQuery, clearAllQuery } = querySlice.actions;

export default querySlice.reducer;
