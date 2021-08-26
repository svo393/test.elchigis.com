import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderItem, OrderState } from '@types'
import { isServer } from 'lib/misc'
import { local } from 'lib/storeHelpers'
import { isPresent } from 'lib/utils'

let savedOrder
if (!isServer) savedOrder = localStorage.getItem('orders')

export let initialState: OrderState = {
  items: isPresent(savedOrder) ? JSON.parse(savedOrder) : {},
  meta: { newOrderId: undefined },
}

let setLocalStorage = (orders: OrderState) => {
  localStorage.setItem('orders', JSON.stringify(orders.items))
}

let slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    orderItemAdditionReceived: (
      orders,
      { payload: { id, ...rest } }: PayloadAction<OrderItem>
    ) => {
      orders.items[id] = { ...rest, status: 'DONE' }
      orders.meta.newOrderId = id
      setLocalStorage(orders)
    },

    newOrderIdReseted: (orders) => {
      orders.meta.newOrderId = undefined
    },
  },
})

export let actions = slice.actions

export let createOrder = (_: any, payload: OrderItem) =>
  local({
    type: actions.orderItemAdditionReceived.type,
    payload,
  })

export let resetNewOrderId = () =>
  local({ type: actions.newOrderIdReseted.type })

export default slice.reducer
