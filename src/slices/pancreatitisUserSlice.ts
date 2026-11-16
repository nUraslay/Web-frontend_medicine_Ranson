import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PancreatitisUserState {
  login: string;
  token: string;
  isAuthenticated: boolean;
}

const initialState: PancreatitisUserState = {
  login: "",
  token: "",
  isAuthenticated: false,
};

const pancreatitisUserSlice = createSlice({
  name: "pancreatitisUser",
  initialState,
  reducers: {
    setPancreatitisUser(state, action: PayloadAction<{ login: string; token: string }>) {
      state.login = action.payload.login;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    resetPancreatitisUser() {
      return initialState;
    },
  },
});

export const { setPancreatitisUser, resetPancreatitisUser } = pancreatitisUserSlice.actions;
export default pancreatitisUserSlice.reducer;
