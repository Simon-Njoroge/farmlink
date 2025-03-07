import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  username: null,
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  isAuthenticated: false,
  access_token: null,  // Store JWT access token
  refresh_token: null, // Store JWT refresh token
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, username, first_name, last_name, email, phone, access, refresh } = action.payload;
      
      state.id = id;
      state.username = username;
      state.first_name = first_name;
      state.last_name = last_name;
      state.email = email;
      state.phone = phone;
      state.isAuthenticated = true;
      state.access_token = access;  // Save access token
      state.refresh_token = refresh; // Save refresh token

      // Save user data + tokens to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
    },

    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.first_name = null;
      state.last_name = null;
      state.email = null;
      state.phone = null;
      state.isAuthenticated = false;
      state.access_token = null;
      state.refresh_token = null;

      // Clear from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },

    setUserFromLocalStorage: (state) => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedAccessToken = localStorage.getItem("access_token");
        const storedRefreshToken = localStorage.getItem("refresh_token");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          state.id = parsedUser.id || null;
          state.username = parsedUser.username || null;
          state.first_name = parsedUser.first_name || null;
          state.last_name = parsedUser.last_name || null;
          state.email = parsedUser.email || null;
          state.phone = parsedUser.phone || null;
          state.access_token = storedAccessToken || null;
          state.refresh_token = storedRefreshToken || null;
          state.isAuthenticated = !!storedAccessToken;
        }
      } catch (error) {
        console.error("Error loading user data from localStorage:", error);
      }
    }
  },
});

export const { setUser, clearUser, setUserFromLocalStorage } = userSlice.actions;

export default userSlice.reducer;
