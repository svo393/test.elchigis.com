import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartState } from '@types'
import { isServer } from 'lib/misc'
import { local } from 'lib/storeHelpers'
import { isPresent } from 'lib/utils'

let savedCart
if (!isServer) savedCart = localStorage.getItem('cart')

export let initialState: CartState = {
  items: isPresent(savedCart) ? JSON.parse(savedCart) : {},
}

let setLocalStorage = (cart: CartState) => {
  localStorage.setItem('cart', JSON.stringify(cart.items))
}

let slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartItemAdditionReceived: (
      cart,
      {
        payload: { variationId, qty, ...rest },
      }: PayloadAction<CartItem>
    ) => {
      isPresent(cart.items[variationId])
        ? (cart.items[variationId] = {
            ...rest,
            qty: cart.items[variationId]!.qty + qty,
          })
        : (cart.items[variationId] = { ...rest, qty: 1 })

      cart.items[variationId]?.qty === 0 &&
        delete cart.items[variationId]

      setLocalStorage(cart)
    },

    cartItemDeletionReceived: (
      cart,
      {
        payload: { variationId },
      }: PayloadAction<{ variationId: number }>
    ) => {
      delete cart.items[variationId]
      setLocalStorage(cart)
    },

    cartReseted: (cart) => {
      cart.items = {}
      setLocalStorage(cart)
    },
  },
})

export let actions = slice.actions

export let addCartItem = (_: any, payload: CartItem) =>
  local({
    type: actions.cartItemAdditionReceived.type,
    payload,
  })

export let deleteCartItem = (_: any, variationId: number) =>
  local({
    type: actions.cartItemDeletionReceived.type,
    payload: { variationId },
  })

export let resetCart = () => local({ type: actions.cartReseted.type })

export default slice.reducer
