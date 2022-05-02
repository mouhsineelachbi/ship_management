import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import shipReducer from "./ship/ship.slice";
import userReducer from './user/user.slice';

const store = configureStore({
  reducer: {
    ships: shipReducer,
    auth: authReducer,
    user: userReducer
  },
});

export default store;
