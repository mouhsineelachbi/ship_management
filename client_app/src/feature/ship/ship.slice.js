import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiClient from "../../helper/api.client";

export const getAllShips = createAsyncThunk(
  "ships/getShips",
  async (dispatch, getState) => {
    return await ApiClient()
      .get("Ship")
      .then((res) => res.data);
  }
);

export const findIndexById = (id, ships) => {
  let index = -1;
  for (let i = 0; i < ships.length; i++) {
    if (ships[i].id === id) {
      index = i;
      break;
    }
  }
  return index;
};

export const addShip = createAsyncThunk("ships/addShip", async (ship) => {
  return await ApiClient()
    .post("Ship", ship)
    .then((res) => res.data.value);
});

export const updateShip = createAsyncThunk("ships/updateShip", async (ship) => {
  return await ApiClient()
    .put(`Ship/${ship.id}`, ship)
    .then((res) => res.data);
});

export const deleteShip = createAsyncThunk(
  "ships/deleteShip",
  async (shipId) => {
    return await ApiClient()
      .delete(`Ship/${shipId}`)
      .then((res) => res.data);
  }
);

export const deleteShips = createAsyncThunk(
  "ships/deleteShips",
  async (ships) => {
    ApiClient()
      .delete("Ship/deleteShips", { data: ships })
      .then((res) => res);
  }
);

const shipsSlice = createSlice({
  name: "ships",
  initialState: {
    isLoading: false,
    ships: null,
    errorMessage: "",
    isAdded: false,
  },
  extraReducers: {
    [getAllShips.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllShips.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.ships = action.payload;
    },
    [getAllShips.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    },
    [addShip.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addShip.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAdded = true;
      state.ships.push(action.payload);
    },
    [addShip.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAdded = false;
    },
    [updateShip.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateShip.fulfilled]: (state, action) => {
      let updatedShip = action.meta.arg;
      state.isLoading = false;
      let index = findIndexById(updatedShip.id, state.ships);
      state.ships[index] = updatedShip;
    },
    [updateShip.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
    },
    [deleteShip.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteShip.fulfilled]: (state, action) => {
      let deletedShip = action.meta.arg;
      state.ships = state.ships.filter((val) => val.id !== deletedShip);
      state.isLoading = false;
    },
    [deleteShip.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteShips.pending]: (state, action) => {
      state.isLoading = true;
      console.log(action)
    },
    [deleteShips.fulfilled]: (state, action) => {
      let selectedShips = action.meta.arg
      state.ships = state.ships.filter((val) => !selectedShips.includes(val));
      state.isLoading = false;
    },
    [deleteShips.rejected]: (state, action) => {
      
    }
  },
});

export default shipsSlice.reducer;
