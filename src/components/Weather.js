//import react hooks
import React, { useState, useEffect } from 'react';

//import wrapper component for user inputs
import Wrapper from './Wrapper';


//import getWeather method from utils
import { getWeather } from '../utilities/ThirdPartyAppInvokes';


//import sytling from component style
import StyledWeather from './styles/StyledWeather';


//Weather arrow funtion to set data into 3 different states
const Weather = () => {
  //input data
  const [inputLocation, setInputLocation] = useState('Embu');

  //calculated current date time
  const [currentDate, setCurrentDate] = useState('');

  //location data returned by mapbox
  const [location, setLocation] = useState({
    city: '',
    state: '',
    country: ''
  });

  //weather data returned by openweather
  const [weather, setWeather] = useState({
    currentTemp: 0,
    weatherMain: '',
    tempMax: 0,
    tempMin: 0
  });


  //useEffect hook to load data on app load
  useEffect(() => {
    fetchData('São Paulo').then(([newWeather, placeName]) => {
      setWeather(newWeather);
      setLocation(placeName);
    });
  }, []);

  //fetch weather data for an input location
  async function fetchData(newLocation) {
    const now = new Date();
    setCurrentDate(dateBuilder(now));
    const response = await getWeather(newLocation);
    return response;
  }

  //arrow function to return a background image
  const setBackground = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour <= 7 || hour > 18) {
      return 'blue';
    }
    if (hour > 7 && hour <= 15) {
      return 'green';
    }
    return 'orange';
  }

  //arrow function to build date
  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    console.log(`${day} ${date} ${month} ${year}`);
    return `${day} ${date} ${month} ${year}`;
  }


  //figure out why we do the below arrow function
  const handleInputLocation = (e) => {
    e.preventDefault();
    setInputLocation(e.target.value);
  }

  //arrow function to get weather data
  const getForecast = (e) => {
    e.preventDefault();
    fetchData(inputLocation).then(([newWeather, placeName]) => {
      setWeather(newWeather);
      setLocation(placeName);
    });
  }

  return (
    <StyledWeather bgImage={setBackground()}>
      <Wrapper states={{ location, currentDate, weather }} handleInput={handleInputLocation} handleSubmit={getForecast} />
    </StyledWeather>
  );
}

export default Weather;