import { shipReducer } from "./shipReducer";
import { combineReducers } from "redux";

export const allReducers = combineReducers({
    ship: shipReducer
});