import sunrise from '../assets/sunrise.png';
import sunset from '../assets/sunset.png';
import humidity from '../assets/humidity.png';
import wind_speed from '../assets/wind-speed.png';
import pressure from '../assets/pressure.png';
import UV from '../assets/UV.png';
import Clock from './clock';
import Forecast from './ForeCast';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import React from 'react';


const CityAndTime = ({cityName, lat, lon, setLat, setLon}) => {
 

    const [weatherData, setWeatherData] = useState(null)
    const [foreCastData, setForeCastData] = useState(null)
    const [UVIndex, setUvIndex] = useState(null)

    const fetchData = async () => {
  try {
    const encodedCity = encodeURIComponent(cityName);
    let url;
;

    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      toast.error("API key is missing. Please set the VITE_API_KEY environment variable.");
    }

    if (encodedCity) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=${apiKey}`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    } else {
      toast.error("Missing city name or coordinates");
      return;
    }

    const CurrentWeather = await axios.get(url);
    const { coord } = CurrentWeather.data;

    if (!coord || coord.lat === undefined || coord.lon === undefined) {
      toast.error("Coordinate data is missing from the API response.");
      return;
    }

    setWeatherData(CurrentWeather.data);
    setLat(coord.lat);
    setLon(coord.lon);

    const forecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${apiKey}`
    );
    setForeCastData(forecast.data);

    const UV = await axios.get(
      `https://api.openweathermap.org/data/2.5/uvi?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`
    );
    setUvIndex(UV.data.value);

  } catch (error) {
    if (error.response) {
      console.error("API Error Response:", error.response.data);
      toast.error(`API Error: ${error.response.data.message}`);
    } else {
      console.error("Unexpected error:", error.message);
      toast.error("An unexpected error occurred.");
    }
  }
};


      useEffect(()=>{
     
        if (lat && lon && !cityName) {
          fetchData();
           } 


        if(!cityName || (!lat && !lon)){
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          setLat(latitude);
          setLon(longitude);
          
        },
        (error) => {
          console.log("Geolocation error:", error);
          toast.error("Location access denied . Please enter a city manually.")
        }
      )
      }
      else{
        fetchData();
      }
      
     }, [cityName, lat, lon]
    )

     if(!weatherData || !foreCastData){
      return <div className='flex items-center justify-center text-white text-2xl md:text-6xl'>Loading...</div>
     }

     const { main, weather, sys, wind} = weatherData;
     const {list} = foreCastData

     const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

 return (
    <>
    <div className='flex flex-col xl:flex-row gap-4'>
      {/* Left section for city and time*/}
      <div className='w-full xl:w-1/3 h-auto md:h-72 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-between items-center'>
        <h1 className='text-2xl md:text-3xl font-bold '>{cityName || weatherData.name}</h1>
        <img src={weatherIconUrl} alt="weatherImage" className='w-14 select-none ' />
        <Clock />
      </div>
      {/* right section: weather deatails */}
      <div className='flex-grow h-auto md:h-72 bg-[#050e1fde] shadow-2xl rounded-lg text-white p-4 flex flex-col justify-around md:flex-row items-center md:items-stretch gap-4'>
        {/* temperature and sunrise and sunset */}
        <div className='flex flex-col items-center justify-between xl:justify-center gap-6 md:gap-4'>
          <h1 className='text-5xl md:text-7xl font-bold '>{main.temp}</h1>
          <p className='text-center'>
            Feels Like: <span className='text-lg md:text-xl ml-2 font-bold'>{main.feels_like}&#8451;</span>
          </p>
          <div className='flex xl:flex-col md:flex-row items-center gap-4'>
            <div className='flex items-center gap-2'>
              <img src={sunrise} alt="sunrise" className='h-8 md:h-10 select-none' />
              <div className='text-center'>
                <h6>Sunrise</h6>
                <p>{new Date(sys.sunrise * 1000).toLocaleTimeString()} AM</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <img src={sunset} alt="sunset" className='h-8 md:h-10 select-none' />
              <div className='text-center'>
                <h6>Sunset</h6>
                <p>{new Date(sys.sunset * 1000).toLocaleTimeString()} PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* main weather icon */}
        <div className='flex flex-col  justify-center items-center'>
          <img src={weatherIconUrl} alt="sun" className='w-34 h-34 md:w-48 md:h-48 select-none' />
          <p className='font-bold text-xl md:text-3xl'>{weather[0].description}</p>
        </div>
        {/* Additional weather info */}
        <div className='md:grid md:grid-cols-2 flex flex-row justify-between gap-4 md:p-4'>
          <div className='flex flex-col items-center gap-2'>
            <img src={humidity} alt="humidity" className='h-8 md:h-10 select-none' />
            <p>{main.humidity}%</p>
            <h6>Humidity</h6>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <img src={wind_speed} alt="windspeed" className='h-8 md:h-10 select-none' />
            <p>{wind.speed} km/h</p>
            <h6>Wind Speed</h6>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <img src={pressure} alt="pressure" className='h-8 md:h-10 select-none' />
            <p>{main.pressure} hPa</p>
            <h6>Pressure</h6>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <img src={UV} alt="UV" className='h-8 md:h-10 select-none' />
            <p>{UVIndex !== null ? UVIndex : 'N/A'}</p>
            <h6>UV</h6>
          </div>
        </div>
      </div>
    </div>

    <Forecast forecast={list}/>
    </>
  )
}
export default CityAndTime
