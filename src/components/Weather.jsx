import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const Weather = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('rustavi');
  
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            q: location,
            units: 'imperial',
            appid: process.env.REACT_APP_KEY,
          },
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      setLocation('');
    };
    useEffect(() => {
        fetchData()
    },[])
  
    const handleButtonClick = () => {
      fetchData();
    };
  
  return (
    <div>
         <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          type="text"
        />
        <button onClick={handleButtonClick}>Search</button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Weather