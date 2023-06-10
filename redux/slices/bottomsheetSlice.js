import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  visible: false,
}

const bottomsheetSlice = createSlice({
  name: 'bottomsheet_states',
  initialState,
  reducers: {
    setVisible:(state,action)=>{
        state.visible = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setVisible } = bottomsheetSlice.actions;

export default bottomsheetSlice.reducer