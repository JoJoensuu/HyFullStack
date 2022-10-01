const Course = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
        {props.parts.map(part =>
        <Header key={part.id} header={part.name} exercises={part.exercises} />
        )}
        <Total parts={props.parts} />
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <p>{props.header} {props.exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    const initialValue = 0;
    const total = parts.reduce( (s, p) => 
      s + p.exercises,
      initialValue
  )
    return (
      <>
      <b>total of {total} exercises </b>
      </>
    )
  }

export {Course}