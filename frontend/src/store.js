import { configureStore } from '@reduxjs/toolkit';
import userReducer, { setUserFromLocalStorage } from './slices/userslice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});


store.dispatch(setUserFromLocalStorage());

export default store;
