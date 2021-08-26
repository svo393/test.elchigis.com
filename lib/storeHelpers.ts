import { Dispatch } from '@reduxjs/toolkit'
import { Action, ApiCallInput } from '@types'
import { apiCall } from 'store/middleware/api'

let api = (args: ApiCallInput) => (dispatch: Dispatch) =>
  dispatch(apiCall(args))

export let local = (args: Action) => (dispatch: Dispatch) =>
  dispatch(args)

export let apiGet = (args: ApiCallInput) => api(args)

export let apiPost = (args: ApiCallInput) =>
  api({ method: 'post', ...args })

export let apiPut = (args: ApiCallInput) =>
  api({ method: 'put', ...args })

export let apiDelete = (args: ApiCallInput) =>
  api({ method: 'delete', ...args })
