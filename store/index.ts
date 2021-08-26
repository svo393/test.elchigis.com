import {
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import {
  Context,
  createWrapper,
  HYDRATE,
  MakeStore,
} from 'next-redux-wrapper'
import { AnyAction, combineReducers } from 'redux'
import APIReducer, {
  initialState as APIInitialState,
} from './APISlice'
import cartReducer, {
  initialState as cartInitialState,
} from './cartSlice'
import api from './middleware/api'
import ordersReducer, {
  initialState as ordersInitialState,
} from './ordersSlice'
import ormReducer from './ormReducer'
import UIReducer, { initialState as UIInitialState } from './UISlice'

let combinedReducer = combineReducers({
  ui: UIReducer,
  api: APIReducer,
  orders: ordersReducer,
  cart: cartReducer,
  orm: ormReducer,
})

let reducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
): ReturnType<typeof combinedReducer> =>
  action.type === HYDRATE
    ? { ...action['payload'], cart: state.cart, orders: state.orders }
    : combinedReducer(state, action)

export type RootState = ReturnType<typeof reducer>

let initialState = {
  cart: cartInitialState,
  orders: ordersInitialState,
  ui: UIInitialState,
  api: APIInitialState,
}

let initStore = (preloadedState = initialState) =>
  configureStore({
    reducer: reducer as any,
    preloadedState,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: ['payload.nonSerializableData'],
        },
      }),
      api,
    ],
  })

let makeStore: MakeStore<RootState> = (_: Context) => initStore()

export let wrapper = createWrapper<RootState>(makeStore)
