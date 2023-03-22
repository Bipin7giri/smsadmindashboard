import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { searchObj } from '../interfaces'

interface SearchState {
  searchData: null | string
}

const initialState: SearchState = {
  searchData: null,
}
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<searchObj>) => {
      state.searchData = action.payload.search
    },
  },
})

export const { setSearch } = searchSlice.actions

export default searchSlice.reducer
