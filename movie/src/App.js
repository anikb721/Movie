import React, { useState } from 'react';
import './App.css';
import data from './data';

function MovieCard({ name, duration, date, rating, img }) {
  return (
    <div className='movie-card'>
      <img src={img} alt={name} />
      <h2>Movie Name: {name}</h2>
      <p>Duration: {duration}</p>
      <p>Release Date: {date}</p>
      <p>Rating: {rating}</p>
    </div>
  );
}

function App() {
  const [filteredMovies, setFilteredMovies] = useState(data);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDateFilter = (event) => {
    event.preventDefault();

    if (startDate && endDate) {
      const filteredData = data.filter((movie) => {
        const movieDate = new Date(movie.date);
        const start = new Date(startDate);
        const end = new Date(endDate);

        return movieDate >= start && movieDate <= end;
      });

      setFilteredMovies(filteredData);
    } else {
      // If no dates are selected, reset the filtered list to all movies
      setFilteredMovies(data);
    }
  };

  return (
    <div className='app-container'>
      <div className='filter-container'>
        <h1>Filter Movies By Date-Month</h1>
        <form onSubmit={handleDateFilter} className='filter-form'>
          <input
            type='date'
            placeholder='Start Date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type='date'
            placeholder='End Date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className='movie-list'>
        {filteredMovies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
