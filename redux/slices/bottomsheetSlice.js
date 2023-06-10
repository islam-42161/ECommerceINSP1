import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  visible: false,
  screen:'none',
}

const bottomsheetSlice = createSlice({
  name: 'bottomsheet_states',
  initialState,
  reducers: {
    setVisible:(state,action)=>{
        state.visible = action.payload
    },
    setScreen:(state,action)=>{
      state.screen = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setVisible } = bottomsheetSlice.actions;
export const { setScreen } = bottomsheetSlice.actions;

export default bottomsheetSlice.reducer