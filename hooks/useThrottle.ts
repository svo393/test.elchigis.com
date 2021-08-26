import { deepEq } from 'lib/utils'
import { useEffect, useRef, useState } from 'react'

let useThrottle = (
  value: string,
  cb: (...args: any) => any,
  args: any[]
) => {
  let valueRef = useRef(value)
  let isInitialRender = useRef(true)
  let [isMakingCall, setIsMakingCall] = useState(false)

  useEffect(() => {
    if (
      !isMakingCall &&
      !isInitialRender.current &&
      !deepEq(valueRef.current, value)
    ) {
      setIsMakingCall(true)

      setTimeout(() => {
        setIsMakingCall(false)
        valueRef.current = value
        cb(...args)
      }, 400)
    }
    isInitialRender.current = false
  }, [args, cb, isMakingCall, value])

  return isMakingCall
}

export default useThrottle
