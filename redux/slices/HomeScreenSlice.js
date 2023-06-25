import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  view: "view-quilt",
};

const HomeScreeSlice = createSlice({
  name: "homescreen_states",
  initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setView } = HomeScreeSlice.actions;

export default HomeScreeSlice.reducer;
