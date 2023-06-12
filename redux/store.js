import { configureStore } from '@reduxjs/toolkit'
import GlobalSlice from './slices/GlobalSlice'
import ItemDetailsStates from './slices/ItemDetailsStates'
import bottomsheetSlice from './slices/bottomsheetSlice'
import HomeScreenSlice from './slices/HomeScreenSlice'

export const store = configureStore({
  reducer: {
    item_details_states: ItemDetailsStates,
    globals: GlobalSlice,
    bottomsheet_states: bottomsheetSlice,
    homescreen_states:HomeScreenSlice
  }
})