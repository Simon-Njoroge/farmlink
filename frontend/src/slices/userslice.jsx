import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  id:null,
  username: null,
  first_name: null,
  last_name: null,
  email:null,
  phone: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id=action.payload.id,
      state.username = action.payload.username;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.isAuthenticated = true;

      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.id=null,
      state.username = null;
      state.first_name = null;
      state.last_name = null;
      state.email = null;
      state.phone = null;
      state.isAuthenticated = false;

      // Clear user data from localStorage
      localStorage.removeItem('user');
    },
    setUserFromLocalStorage: (state) => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          state.id=parsedUser.id;
          state.username = parsedUser.username;
          state.first_name = parsedUser.first_name;
          state.last_name = parsedUser.last_name;
          state.email = parsedUser.email;
          state.phone = parsedUser.phone;
          state.isAuthenticated = true;
        }
      } catch (error) {
        console.error("Error loading user data from localStorage:", error);
        // You can handle errors by either resetting state or logging the error.
      }
    }
  },
});

export const { setUser, clearUser, setUserFromLocalStorage } = userSlice.actions;

export default userSlice.reducer;
