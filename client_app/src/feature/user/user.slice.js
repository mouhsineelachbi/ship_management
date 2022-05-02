import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiClient from "../../helper/api.client";

export const getUser = createAsyncThunk("user/getUser", async (dispatch, getState) => {
    return await ApiClient()
      .get("Auth/User")
      .then((res) => res.data)
      .catch((err) => {
        let errorMessage;
        if (err && err.response && err.response.data) {
          errorMessage = err.response.data;
        } else {
          errorMessage = err.message;
        }
        const customError = {
          name: "Custom axios error",
          message: errorMessage.title,
        };
        throw customError;
      });
  });

export const logoutUser = createAsyncThunk("user/logoutUser", async (dispatch, getState) => {
  return await ApiClient()
    .post("Auth/Logout")
    .then((res) => res.data)
    .catch((err) => {
      let errorMessage;
      if (err && err.response && err.response.data) {
        errorMessage = err.response.data;
      } else {
        errorMessage = err.message;
      }
      const customError = {
        name: "Custom axios error",
        message: errorMessage.title,
      };
      throw customError;
    });
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userLoading: false,
    error: ''
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
        state.userLoading= true;
    },
    [getUser.fulfilled]: (state, action) => {
        state.userLoading= false;
        state.user = action.payload
    },
    [getUser.rejected]: (state, action) => {
        state.userLoading= false;
        state.error = action.error.message;
    },
    [logoutUser.pending]: (state, action) => {
      state.userLoading = true;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.user = null;
    },
    [logoutUser.rejected]: (state, action) => {
      state.userLoading = false;
      state.error = action.error.message;

    }
  },
});


export default userSlice.reducer;