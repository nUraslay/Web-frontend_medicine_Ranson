import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import pancreatitisSignsReducer from "../slices/pancreatitisSignsSlice";
import pancreatitisUserReducer from "../slices/pancreatitisUserSlice";

export const store = configureStore({
  reducer: combineReducers({
    pancreatitisSigns: pancreatitisSignsReducer,
    pancreatitisUser: pancreatitisUserReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
