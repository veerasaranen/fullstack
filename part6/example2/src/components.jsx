import { useCounterValue } from '../CounterContext'
import { useCounterDispatch } from '../CounterContext'

export const Display = () => {
  const counter = useCounterValue()
  return <div>
    {counter}
  </div>
}

export const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch()
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}