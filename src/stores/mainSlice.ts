import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserPayloadObject } from '../interfaces'

interface MainState {
  userEmail: null | string
  userAvatar?: null | string
  isFieldFocusRegistered: boolean
  token?: null | string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  address?: string
}

const initialState: MainState = {
  /* User */
  firstName: null,
  userEmail: null,
  userAvatar: null,
  token: null,
  lastName: null,
  phoneNumber: null,
  address: null,

  /* Field focus with ctrl+k (to register only once) */
  isFieldFocusRegistered: false,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayloadObject>) => {
      console.log(action.payload)
      if (action.payload.token) {
        localStorage.setItem('access_token', action.payload.token)
        localStorage.setItem('isLogin', 'true')
        state.token = localStorage.getItem('access_token')
      }

      state.firstName = action.payload.firstName
      state.userEmail = action.payload.userEmail
      state.userAvatar = action.payload.userAvatar
      state.address = action.payload.address
      state.lastName = action.payload.lastName
      state.phoneNumber = action.payload.phoneNumber
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = mainSlice.actions

export default mainSlice.reducer
