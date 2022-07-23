import React, { memo, useEffect, useState } from "react"
import useInterval from "utils/hooks/useInterval"

interface BubbleSortType<T> {
  array: T[],
  delay: number | null,
  isPlaying: boolean,
  playingCallback: (value:boolean) => void
} 

function BubbleSort({array, delay, isPlaying, playingCallback}:BubbleSortType<number | string>) {

  const [data, setData] = useState(array)
  const [length, setLength] = useState<number>(1)
  const [isSwap, setSwap] = useState(false)
  const arrIsEqual = data.length == array.length

  function promiseSwap(arr: (string | number)[], length: number):Promise<((string | number)[] | Error)> {
    return new Promise<((string | number)[] | Error)>((resolve, reject) => {
      try {
        swap(arr, length, length-1)
        setData(arr)
        console.warn(arr)
        resolve(arr)
      } catch (error) {
        throw new Error(error)
      }
    })
  }

  useInterval(
    () => {
      // setLength(length+1)
      setSwap(false)
      const arr = [...data]
      let isSorted = true
      // setInterval(() => {
      if(length < array.length) {
        if(arr[length-1] > arr[length]) {
          setSwap(true);
          promiseSwap(arr, length)
          .then((r) => {
            setTimeout(() => {
              setLength(length+1)
            }, delay)
          })
        } else setLength(length+1)
      }
      else {
        let n = 1
        while (n < data.length) {
          if(data[n-1] > data[n]) isSorted = false
          n++
        }
        setLength(1)
        if (isSorted) playingCallback(false)
      }
    },
    isPlaying ? delay : null,
  )

  useEffect(() => {
    setData(array)
  }, [array])

  function sortArray<T>(array: Array<T>, slow = 0, fast = 1) {
    let isSorted = true
    while(fast < array.length) {
      if(array[slow] > array[fast]) {
        swap(array, slow, fast)
        isSorted = false
      }
      fast++
      slow++
    }

    return isSorted ? array : sortArray(array, 0, 1)
  }

  function swap<T>(array: Array<T>, i: number, j: number) {
    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
  }

  return(
    <div className="flex-1 h-full flex-col justify-center content-center mt-8">
      <div className="flex justify-center">
        <h2 className="text-2xl font-bold">Bubble Sort</h2>
      </div>
      <div className="flex flex-row justify-center items-center space-x-2">
        {
          data.length > 0 && data.map((item, idx) => (
            <div
              key={idx}
              className={
                `flex w-20 h-20 justify-center items-center self-center text-4xl border-8 ${idx == length ? 'border-green-500' : 'border-black text-black'} ${idx == length-1 ? 'border-blue-500' : 'border-black text-black'}
                  ${isSwap && (idx == length || idx == length-1) ? 'font-black' : 'font-normal'}
                `
              }
            >{item}</div>
          ))
        }
      </div>
    </div>
  )
}

const BubbleSortComponent = memo(
  BubbleSort,
  (prev, next) => {
    return prev.array === next.array && prev.isPlaying === next.isPlaying && prev.delay === next.delay
  }
)

export default BubbleSortComponent;