import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  search_text: '',
}

const search_screen_slices = createSlice({
  name: 'search_screen_states',
  initialState,
  reducers: {
    setSearchText:(state,action)=>{
        state.search_text = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSearchText } = search_screen_slices.actions;

export default search_screen_slices.reducer