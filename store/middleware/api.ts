import { createAction, Middleware } from '@reduxjs/toolkit'
import { ApiCallInput } from '@types'
import axios from 'axios'
import {
  isAbsent,
  isPositiveNumber,
  isPresent,
  isString,
} from 'lib/utils'
import { actions as UIActions } from '../UISlice'
import { actions as APIActions } from '../APISlice'

export let apiCall = createAction<ApiCallInput>('apiCall')

let api: Middleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCall.type) return next(action)

    let {
      queryId,
      cookies,
      url,
      method,
      name,
      data,
      onStart,
      onStartData,
      onError,
      onErrorData,
      onSuccess,
      silentError,
      nonSerializableData,
      timeout = 25000,
    } = action.payload

    let apiCallBegan = createAction<any>(`api/${name}`)

    isPresent(onStart) &&
      dispatch({
        type: onStart,
        payload: onStartData,
      })

    dispatch(apiCallBegan(action.payload))

    try {
      let response = await axios({
        headers: isPresent(cookies) ? { cookie: cookies } : undefined,
        // withCredentials: true,
        timeout,
        baseURL: process.env['NEXT_PUBLIC_BASE_URL'],
        url,
        method,
        data: isPresent(nonSerializableData)
          ? nonSerializableData
          : data,
      })

      let cursor = response.headers['content-range']

      if (isString(cursor)) {
        let [entry, , endCursor, total] = cursor.split(/[\s/-]/)

        let _entry = entry?.toLowerCase()
        let _endCursor = Number(endCursor)
        let _total = Number(total)

        isString(_entry) &&
          isPositiveNumber(_endCursor) &&
          isPositiveNumber(_total) &&
          dispatch({
            type: APIActions.cursorReceieved.type,
            payload: {
              entry: _entry,
              endCursor: _endCursor,
              hasNextPage: _total > _endCursor,
            },
          })
      }

      isString(onSuccess) &&
        dispatch({
          type: onSuccess,
          payload: response.data,
        })

      Array.isArray(onSuccess) &&
        onSuccess.forEach((type) => {
          dispatch({ type, payload: response.data })
        })

      dispatch({
        type: UIActions.watcherStatusSetted.type,
        payload: `${queryId}__Success`,
      })
    } catch (error: any) {
      isPresent(onError) &&
        dispatch({
          type: onError,
          payload: onErrorData,
        })

      if (isAbsent(silentError)) {
        console.info('error', error)
        let message = error.response
          ? error.response.statusText
          : error.code === 'ECONNABORTED'
          ? 'A timeout occured'
          : error.request
          ? error.request
          : error.message ?? null

        dispatch({
          type: UIActions.errorSetted.type,
          payload: { queryId, message },
        })
      }
    }
  }

export default api
