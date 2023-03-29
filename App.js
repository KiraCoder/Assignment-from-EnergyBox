import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [trainPositions, setTrainPositions] = useState([]);
  const [filteredTrainPositions, setFilteredTrainPositions] = useState([]);
  const [lineFilter, setLineFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [carFilter, setCarFilter] = useState('');

  useEffect(() => {
      fetchTrainPositions();
      const interval = setInterval(fetchTrainPositions, 10000); // fetch data every 10 seconds
      return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFilteredTrainPositions(
      trainPositions.filter(position => {
        const lineMatch = !lineFilter || position.LineCode === lineFilter;
        const serviceMatch = !serviceFilter || position.ServiceType === serviceFilter;
        const carMatch = !carFilter || position.CarCount === carFilter;
        return lineMatch && serviceMatch && carMatch;
      })
    );
  }, [trainPositions, lineFilter, serviceFilter, carFilter]);

  
  const fetchTrainPositions = () => {
    fetch('https://api.wmata.com/TrainPositions/TrainPositions?contentType=json&api_key=99c562d9a0b74f14a0e92e04232cd9a0')
      .then(response => response.json())
      .then(data => setTrainPositions(data.TrainPositions));
  };
  const handleLineFilterChange = event => {
    setLineFilter(event.target.value);
  };

  const handleServiceFilterChange = event => {
    setServiceFilter(event.target.value);
  };

  const handleCarFilterChange = event => {
    setCarFilter(parseInt(event.target.value));
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Assignment from EnergyBox</h1>
      </header>
      <main>
        <div className="filters">
          <div>
            <label htmlFor="line-filter">Filter by Line:</label>
            <select id="line-filter" value={lineFilter} onChange={handleLineFilterChange}>
              <option value="">All Lines</option>
              <option value="RD">Red Line</option>
              <option value="BL">Blue Line</option>
              <option value="YL">Yellow Line</option>
              <option value="GR">Green Line</option>
              <option value="OR">Orange Line</option>
              <option value="SV">Silver Line</option>
            </select>
          </div>

        <div>
          <label htmlFor="service-filter">Filter by Service Type:</label>
          <select id="service-filter" value={serviceFilter} onChange={handleServiceFilterChange}>
            <option value="">All Service Types</option>
            <option value="Normal">Normal</option>
            <option value="Express">Express</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
        <div>
          <label htmlFor="car-filter">Filter by Car Count:</label>
          <select id="car-filter" value={carFilter} onChange={handleCarFilterChange}>
            <option value="">All Car Counts</option>
            <option value="6">6 Cars</option>
            <option value="8">8 Cars</option>
          </select>
        </div>
      </div>
      <hr/>
        <div className="train-positions">
          {filteredTrainPositions.map(position => (
            <div className="train" key={position.TrainId}>
              <div className={`line line-${position.LineCode}`}>{position.LineCode}</div>
              <div className="car-count">{position.CarCount} Cars</div>
              <div className="service-type">{position.ServiceType}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;