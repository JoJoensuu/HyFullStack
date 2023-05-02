import { useState, useEffect } from 'react';
import axios from 'axios';
import { DiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data)
    })
  }, [])

  return (
    <div>
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
