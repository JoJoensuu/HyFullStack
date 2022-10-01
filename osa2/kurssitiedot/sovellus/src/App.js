const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(part =>
      <Header key={part.id} header={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Header = (props) => {
  return (
    <p>{props.header} {props.exercises}</p>
  )
}

export default App;
