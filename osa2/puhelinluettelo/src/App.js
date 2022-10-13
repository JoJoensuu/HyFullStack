import { useState, useEffect } from 'react'
import noteService from './services/persons'

const Person = (props) => {
  return (
    <li key={props.id}>
    {props.name} {props.number}
    <button onClick={props.toggleRemove}>delete</button>
  </li>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
            name: <input value={props.newName}
            onChange={props.handleNameChange}/>
        </div>
        <div>
            number: <input value={props.newNumber}
            onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const FilterForm = (props) => {
  return (
    <div>
      filter shown with <input value={props.filter}
      onChange={props.handleFilterChange}/>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === nameObject.name)) {
      if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {
      const samePerson = persons.find(n => n.name === nameObject.name)
      const changedNumber = { ...samePerson, number: nameObject.number}
      noteService
        .update(samePerson.id, changedNumber)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== samePerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      noteService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      noteService
      .remove(id)
    }
    noteService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => 
          <Person
          name={person.name}
          id={person.id}
          number={person.number}
          toggleRemove={() => removePerson(person.id, person.name)}
          />
          )}
      </ul>
    </div>
  )
}

export default App