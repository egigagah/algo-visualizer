import { useEffect, useRef } from "react"

function useInterval(callback:Function, delay?:number|null) {
  const callbackRef = useRef(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if(!delay && delay !== 0) return

    const interval = setInterval(() => callbackRef.current(), delay)
    console.log(interval, "--")
    return () => clearInterval(interval)
  }, [delay])
}

export default useInterval