import { configureStore, Store } from '@reduxjs/toolkit';
import { querySlice } from './querySlice';

const store: Store = configureStore({
  reducer: {
    query: querySlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
