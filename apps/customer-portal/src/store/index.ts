import { configureStore } from '@reduxjs/toolkit'
import {
    useDispatch as useDispatchBase,
    useSelector as useSelectorBase,
} from 'react-redux'
import { reducer as CustomerReducer } from 'Store/slices/customer.slice'

export const Store = configureStore({
    reducer: {
        customer: CustomerReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>

// Inferred type: { users: UsersState}
type AppDispatch = typeof Store.dispatch

// Since we use typescript, lets utilize `useDispatch`
export const useDispatch = () => useDispatchBase<AppDispatch>()

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
    selector: (state: RootState) => TSelected,
): TSelected => useSelectorBase<RootState, TSelected>(selector)

export default Store
