import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiClient from "../../helper/api.client";

export const addUser = createAsyncThunk("auth/createUser", async (user) => {
  return await ApiClient()
    .post("Auth/Register", user)
    .then((res) => res.data.value)
    .catch((err) => {
      let errorMessage;
      if (err && err.response && err.response.data) {
        errorMessage = err.response.data;
      } else {
        errorMessage = err.message;
      }
      const customError = {
        name: "Custom axios error",
        message: errorMessage,
      };
      throw customError;
    });
});

export const loginUser = createAsyncThunk("auth/login", async (user) => {
  return await ApiClient()
    .post("Auth/Login", user)
    .then((res) => res.data.value)
    .catch((err) => {
      let errorMessage;
      if (err && err.response && err.response.data) {
        errorMessage = err.response.data;
      } else {
        errorMessage = err.message;
      }
      const customError = {
        name: "Custom axios error",
        message: errorMessage,
      };
      throw customError;
    });
});



const authSlice = createSlice({
  name: "Auth",
  initialState: {
    isLoading: false,
    error: '',
    loggedin: false
  },
  extraReducers: {
    [addUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addUser.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
    },
    [addUser.rejected]: (state, action) => {
        state.isLoading = false;
        state.error =  action.error.message;
    },
    [loginUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.loggedin = true;
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.loggedin = false;
      state.error =  action.error.message;
   },

  },
});


export default authSlice.reducer;