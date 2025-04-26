import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { setCollapseStateLocal } from 'src/services/localForage/collapse.service'

export interface CounterState {
  barState: boolean
}

const initState = {
  barState: false,
}

export const generalSlice = createSlice({
  name: 'counter',
  initialState: initState,
  reducers: {
    setCollapseState: (state, action: PayloadAction<boolean>) => {
      state.barState = action.payload
      setCollapseStateLocal({ state: action.payload })
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCollapseState } = generalSlice.actions

export default generalSlice.reducer
