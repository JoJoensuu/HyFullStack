const App = () => {

  interface CourseName {
    name: string;
  };

  interface CoursePart {
    name: string;
    exerciseCount: number;
  };

  const Header = (props: CourseName) => {
    return <h1>{props.name}</h1>
  };

  const Content = ({ parts }: { parts: CoursePart[] }) => {
    return (
      <div>
        {parts.map(({ name, exerciseCount }) => (
          <p key={name}>
             {name} {exerciseCount}
          </p>
        ))}
      </div>
    );
  };

  const Total = ({ parts }: { parts: CoursePart[] }) => {
    const total = parts.reduce((i, part) => i + part.exerciseCount, 0);
    return <p>Number of exercises {total}</p>
  };

  const courseName = "Half Stack application development";
  const courseParts: { name: string; exerciseCount: number }[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;