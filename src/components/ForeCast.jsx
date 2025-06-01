import React from 'react';


const ForeCast = ({ forecast }) => {


    const dailyForeCast=forecast.reduce((acc, item) =>{
      const date = new Date(item.dt * 1000).toLocaleDateString()
      if(!acc.find(f => f.date === date)){
        acc.push({
          temperature: `${item.main.temp}°C`,
          day: new Date(item.dt * 1000).toLocaleDateString('en-EN',{weekday: 'short'}),
          date: date,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        })
      }
      return acc;
    }, []).slice(0, 5);  

    const hourlyForeCast = forecast.slice(0, 5).map(item => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      degree: `${item.main.temp}°C`,
      windspeed: `${item.wind.speed}`
    }))

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="xl:w-96 w-full h-96 px-4 py-4 bg-[#050e1fde] shadow-2xl shadow-black  m-4 mt-10 rounded-lg text-white">
        <h2 className="flex items-center justify-center font-bold text-2xl">5 Days Forecast</h2>
        {dailyForeCast.map((cast, index)=>(
          <div key={index} className="flex flex-row justify-between items-center p-0">
              <img src={cast.icon} alt="weather icon" className=" h-16 w-16 select-none"/>
              <p className="font-bold items-center ">{cast.temperature}</p>
              <p className="text-bold">{cast.day}, {cast.date}</p>
          </div>
        ))}
      </div>
      <div className="flex-grow h-auto px-4 py-4 bg-[#050e1fde] shadow-2xl m-4 mt-10 rounded-lg text-white">
         <h1 className="text-2xl font-bold mb-4 flex items-center justify-center ">Hourly Forecast</h1>
         <div className="flex flex-wrap justify-around items-center gap-4 h-54 mt-10">
            {hourlyForeCast.map((hourCast, index)=>(
              <div key={index} className="flex flex-col items-center gap-5 bg-[#1c2938] rounded-lg p-4 w-28 text-center shadow-md">
                <p className="text-sm font-medium">{hourCast.time}</p>
                <img src={hourCast.icon} alt="weather icon" />
                <p>{hourCast.degree}</p>
                <p>{hourCast.windspeed} km/h</p>
               
              </div>
            ))}
         </div>
      </div>
    </div>
  )
};
export default ForeCast
