import { combineReducers } from "redux";
import { parkingReducer } from "./parkingReducer";

export const rootReducer = combineReducers({
  parking: parkingReducer,
});
