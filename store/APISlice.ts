import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { APIState, CursorState } from '@types'

let initialValues = { endCursor: 0, hasNextPage: false }

export let initialState: APIState = {
  products: initialValues,
}

let slice = createSlice({
  name: 'API',
  initialState,
  reducers: {
    cursorReceieved: (
      slice,
      {
        payload: { entry, endCursor, hasNextPage },
      }: PayloadAction<CursorState & { entry: keyof APIState }>
    ) => {
      slice[entry] = { endCursor, hasNextPage }
    },
  },
})

export let actions = slice.actions
export default slice.reducer
