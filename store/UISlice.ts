import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UIState } from '@types'
// import { UIState } from '../types'
import { local } from 'lib/storeHelpers'

let watcherInitialValues = { status: null }

let errorInitialValues = { message: '', queryId: '' }

export let initialState: UIState = {
  watcher: watcherInitialValues,
  error: errorInitialValues,
}

let slice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    errorSetted: (
      slice,
      {
        payload: { message, queryId },
      }: PayloadAction<{ message: string; queryId: string }>
    ) => {
      slice.error = { message, queryId }
    },

    errorReseted: (slice) => {
      slice.error = { message: '', queryId: '' }
    },

    watcherStatusSetted: (
      { watcher },
      { payload }: PayloadAction<string | null>
    ) => {
      watcher.status = payload
    },

    watcherStatusReseted: (slice) => {
      slice.watcher = watcherInitialValues
    },
  },
})

export let actions = slice.actions
export default slice.reducer

export let setWatcher = (data: string | null) =>
  local({ type: actions.watcherStatusSetted.type, payload: data })

export let resetError = () =>
  local({ type: actions.errorReseted.type })
