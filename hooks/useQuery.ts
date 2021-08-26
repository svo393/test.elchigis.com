import { nanoid } from 'nanoid'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'

let useQuery = (
  query: (...args: any[]) => void
): [typeof action, typeof state, typeof error] => {
  let {
    watcher: { status },
    error: { queryId, message },
  } = useSelector((state: RootState) => state.ui)

  let [state, setState] = useState('idle')
  let [error, setError] = useState('')
  let id = useRef<string>()
  let dispatch = useDispatch()

  let action = useCallback(
    (...payload: any[]) => {
      id.current = nanoid()
      dispatch(query(id.current, ...payload))
      setState('loading')
    },
    [dispatch, query]
  )

  useEffect(() => {
    status?.startsWith(`${id.current}`) &&
      status?.endsWith('__Success') &&
      setState('success')
  }, [status])

  useEffect(() => {
    if (queryId === id.current) {
      setState('error')
      setError(message)
    }
  }, [message, queryId])

  return [action, state, error]
}

export default useQuery
