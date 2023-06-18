import { configureStore } from '@reduxjs/toolkit'
import GlobalSlice from './slices/GlobalSlice'
import ItemDetailsStates from './slices/ItemDetailsStates'
import bottomsheetSlice from './slices/bottomsheetSlice'
import HomeScreenSlice from './slices/HomeScreenSlice'
import search_screen_slices from './slices/search_screen_slices'

export const store = configureStore({
  reducer: {
    item_details_states: ItemDetailsStates,
    globals: GlobalSlice,
    bottomsheet_states: bottomsheetSlice,
    homescreen_states:HomeScreenSlice,
    search_screen_states:search_screen_slices
  }
})