import { configureStore } from '@reduxjs/toolkit';
import { querySlice } from './querySlice';

export default configureStore({
  reducer: {
    query: querySlice.reducer,
  },
});
