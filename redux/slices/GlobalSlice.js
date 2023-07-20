import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: true,
  bottom_tab_visible: true,
};

const GlobalSlice = createSlice({
  name: "global_states",
  initialState,
  reducers: {
    setConnection: (state, action) => {
      state.connected = action.payload;
    },
    setBottomtabVisible: (state, action) => {
      state.bottom_tab_visible = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setConnection, setBottomtabVisible } = GlobalSlice.actions;

export default GlobalSlice.reducer;
