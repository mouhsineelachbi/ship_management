import { configureStore } from "@reduxjs/toolkit";
import shipReducer from "./ship.slice";

const store = configureStore({
  reducer: {
    ships: shipReducer,
  },
});

export default store;
