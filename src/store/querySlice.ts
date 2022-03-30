import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QueryState {
  value: string[];
}

const initialState: QueryState = {
  value: []
}

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    addQuery: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
    clearAllQuery: (state) => {
      state.value = [];
    },
  },
});

export const { addQuery, clearAllQuery } = querySlice.actions;

export default querySlice.reducer;
