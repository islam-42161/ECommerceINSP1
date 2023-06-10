import { configureStore } from '@reduxjs/toolkit'
import GlobalSlice from './slices/GlobalSlice'
import ItemDetailsStates from './slices/ItemDetailsStates'
import bottomsheetSlice from './slices/bottomsheetSlice'

export const store = configureStore({
  reducer: {
    item_details_states: ItemDetailsStates,
    globals: GlobalSlice,
    bottomsheet_states: bottomsheetSlice
  }
})