import { useState } from 'react'

const App = (props) => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = () => {
    setGood(good + 1)
  }
  const setNeutralValue = () => {
    setNeutral(neutral + 1)
  }
  const setBadValue = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setGoodValue} text="good" />
      <Button handleClick={setNeutralValue} text="neutral" />
      <Button handleClick={setBadValue} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
      no feedback given
      </div>
    )
  }
  return (
  <div>
    <table>
      <tbody>
      <StatisticLine text="good" value={props.good} />
    <StatisticLine text="neutral" value={props.neutral} />
    <StatisticLine text="bad" value={props.bad} />
    <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
    <StatisticLine text="average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
    <StatisticLine text="positive" value={props.good / (props.good + props.neutral + props.bad) * 100} extraText=" %" />
      </tbody>
    </table>
  </div>
  )
}

const StatisticLine = props => 
    <tr>
        <td>
          {props.text}
        </td>
        <td>
          {props.value} {props.extraText}
        </td>
      </tr>



export default App