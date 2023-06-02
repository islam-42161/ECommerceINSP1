import { configureStore } from '@reduxjs/toolkit'
import GlobalSlice from './slices/GlobalSlice'
import ItemDetailsStates from './slices/ItemDetailsStates'

export const store = configureStore({
  reducer: {
    item_details_states: ItemDetailsStates,
    globals: GlobalSlice,
  },
})