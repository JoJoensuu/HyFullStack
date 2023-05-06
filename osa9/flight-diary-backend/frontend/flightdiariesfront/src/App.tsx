import { useState, useEffect } from 'react';
import axios from 'axios';
import { DiaryEntry, Weather, Visibility, NewDiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data)
    })
  }, [])

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd: NewDiaryEntry = {
      date: newDate,
      weather: newWeather as Weather,
      visibility: newVisibility as Visibility,
      comment: newComment
    };
    try {
      const response = await axios.post<DiaryEntry>('http://localhost:3000/api/diaries', diaryToAdd);
      setDiaries(diaries.concat(response.data));
    } catch(error) {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data || 'An unexpected error occurred.');
        setErrorMessage(message);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    }

    setNewDate('')
    setNewWeather('')
    setNewVisibility('')
    setNewComment('')
  };

  return (
    <div>
      <h1>Add new entry</h1>
      {errorMessage && <h2 style={{ color: 'red' }}>{errorMessage}</h2>}
      <form onSubmit={diaryCreation}>
        date<input
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)}
        /><br></br>
        weather<input
          value={newWeather}
          onChange={(event) => setNewWeather(event.target.value)}
        /><br></br>
        visibility<input
          value={newVisibility}
          onChange={(event) => setNewVisibility(event.target.value)}
        /><br></br>
        comment<input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        /><br></br>
        <br></br>
        <button type='submit'>Add</button>
      </form>
      <h1>Diary entries</h1>
        {diaries.map(diary =>
          <div key={diary.id}>
            <h2>{diary.date}</h2>
            <p>Visibility: {diary.visibility}</p>
            <p>Weather: {diary.weather}</p>
          </div>
        )}
    </div>
  )
}

export default App;
