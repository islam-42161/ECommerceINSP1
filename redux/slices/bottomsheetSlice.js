import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  screen:'none',
}

const bottomsheetSlice = createSlice({
  name: 'bottomsheet_states',
  initialState,
  reducers: {
    setScreen:(state,action)=>{
      state.screen = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setScreen } = bottomsheetSlice.actions;

export default bottomsheetSlice.reducer