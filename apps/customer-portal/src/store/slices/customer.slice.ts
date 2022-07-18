import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { Draft, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'Store'

export interface CustomerState {
  email?: string;
  firstName?: string;
  lastName?: string;
  isSignedIn?: boolean;
}

const initialState: CustomerState = {
  email: '',
  firstName: '',
  lastName: '',
  isSignedIn: false,
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setState: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState>,
    ) => {
      Object.assign(state, action.payload)
    },
  },
})

export const { setState: setCustomerState } = customerSlice.actions

export const selectCustomer = createSelector<[(
state: RootState) => CustomerState], CustomerState>(
  (state) => state.customer,
  (customer) => customer,
  )

export const { reducer } = customerSlice
