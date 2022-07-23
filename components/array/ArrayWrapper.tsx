import React, { ChangeEvent, useEffect, useState } from "react";
import BubbleSortComponent from "./sort/BubbleSort";

export default function ArrayWrapper():JSX.Element {
  const [data, setData] = useState([9,8,7,6,5,4,3,2,1,0])
  const [delay, setDelay] = useState<number>(1000)
  const [isPlaying, setPlaying] = useState<boolean>(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value))
  }

  const resetData = () => {
    setData([])
  }

  const randomArray = () => {
    resetData()
    const x = []
    const length = Math.floor(Math.random() * 10 + 3)
    while (x.length < length) {
      x.push(Math.floor(Math.random() * 100))
    }
    setData(x)
  }

  return (
    <div className="flex-1 h-screen">
      <div className="">
        <h1 className="">
          Array Sort
        </h1>

        <div className="flex flex-row space-x-8">
          <button className="px-4 py-2 border rounded-lg bg-green-200" onClick={() => setPlaying(!isPlaying)}>
            {isPlaying ? 'pause' : 'replay'}
          </button>
          <button className="px-4 py-2 border rounded-lg bg-yellow-200" disabled={isPlaying} onClick={() => resetData()}>
            Reset
          </button>
          <button className="px-4 py-2 border rounded-lg bg-red-200" onClick={() => randomArray()}>
            Random
          </button>
        </div>
      <p>
        <label htmlFor="delay">Delay: </label>
        <input
          autoComplete="off"
          type="number"
          name="delay"
          onChange={handleChange}
          value={delay}
        />
      </p>


      <BubbleSortComponent array={data} delay={delay} isPlaying={isPlaying} playingCallback={(val) => {setPlaying(val)}} />
      </div>
    </div>
  );
}
