import './App.css';

import { useState, useEffect } from 'react'

function App() {

  const [trainPositions, setTrainPositions] = useState([])

  const loadTrains = () => {
    fetch('https://api.wmata.com/TrainPositions/TrainPositions?contentType=json&api_key=99c562d9a0b74f14a0e92e04232cd9a0')
      .then(r => r.json())
      .then(json => setTrainPositions(json.TrainPositions))
  }

  useEffect(() => {
    loadTrains()
  }, [])
  

  return (
    <div className="App">
      <ul>
        { trainPositions.length > 0 && trainPositions.map(item => (
          <li key={item.TrainId}>
            <div>ID: {item.TrainId}</div>
            <div>CarCount: {item.CarCount}</div>
            <div>LineCode: {item.LineCode}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
