import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: 0,
  wishlisted: false,
  seeExtra: true,
  activeColorIndex: 0,
  ambienceColor: "#151515",
};

const ItemDetailsStates = createSlice({
  name: "states",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    toggleWishlisted: (state) => {
      state.wishlisted = !state.wishlisted;
    },
    setSeeExtra: (state, action) => {
      state.seeExtra = action.payload;
    },
    setActiveColorIndex: (state, action) => {
      state.activeColorIndex = action.payload;
    },
    setAmbienceColor: (state, action) => {
      state.ambienceColor = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setItems,
  toggleWishlisted,
  setSeeExtra,
  setActiveColorIndex,
  setAmbienceColor,
} = ItemDetailsStates.actions;

export default ItemDetailsStates.reducer;
