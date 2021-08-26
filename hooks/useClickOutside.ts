import { isPresent } from 'lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'

let useClickOutside = <T extends HTMLElement = HTMLDivElement>(
  initialState: boolean
): [typeof ref, typeof state, typeof setState] => {
  let [state, setState] = useState(initialState)
  let ref = useRef<T>(null)

  let handleClickOutside = useCallback(({ target }: MouseEvent) => {
    if (
      isPresent(ref.current) &&
      !ref.current.contains(target as Node) &&
      Boolean((target as HTMLElement).closest('body'))
    ) {
      setState(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true)

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
        true
      )
    }
  }, [handleClickOutside])

  return [ref, state, setState]
}

export default useClickOutside
