import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  view: "view-quilt",
  homescreen_items: null,
  categories: null,
  greetings_show: true,
};

const HomeScreeSlice = createSlice({
  name: "homescreen_states",
  initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
    },
    setHomescreenItems: (state, action) => {
      state.homescreen_items = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setGreetingsShow: (state, action) => {
      state.greetings_show = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setView, setHomescreenItems, setCategories, setGreetingsShow } =
  HomeScreeSlice.actions;

export default HomeScreeSlice.reducer;
