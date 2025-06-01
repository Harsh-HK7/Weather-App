const ForeCast = ({ forecast }) => {
    // const forecast = [
    //     {temperature: "20°C", day: "Friday", date: "1 Sep", icon:"⛅"},
    //     {temperature: "22°C", day: "Saturday", date: "2 Sep", icon:"🌤️"},
    //     {temperature: "27°C", day: "Sunday", date: "3 Sep", icon:"☀️"},
    //     {temperature: "18°C", day: "Monday", date: "4 Sep", icon:"🌦️"},
    //     {temperature: "16°C", day: "Tuesday", date: "5 Sep", icon:"🌧️"},
    // ]

    // const hourlyForecast = [
    //     {time: "12:00",icon: "☀️", degree: "26°C", windspeed: '3km/h', },
    //     {time: "15:00",icon: "☀️", degree: "27°C", windspeed: '2km/h', },
    //     {time: "18:00",icon: "🌤️", degree: "27°C", windspeed: '2km/h', },
    //     {time: "21:00",icon: "🌙", degree: "25°C", windspeed: '3km/h', },
    //     {time: "00:00",icon: "🌙", degree: "22°C", windspeed: '3km/h', },

    // ]

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
    <div className="flex">
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
         <div className="flex justify-around items-center gap-4 h-54 mt-10">
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
