import React from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import { error } from 'console';

function App() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [temperature,SetTemperature] = React.useState<String>();
  const [minTemp,SetMinTemp] = React.useState<String>();
  const [maxTemp,SetMaxTemp] = React.useState<String>();
  const [humidity,SetHumidity] = React.useState<String>();
  const [responseGet,SetresponseGet] = React.useState<Boolean>(false);
  const getCoordinates= async (location:String)=>{
    fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`)
    .then((res)=>{
      const response = res.json()
      response.then((resp)=>{
        const data = resp[0]
        const {lat,lon} = data
        console.log("coordinates",lat,lon);
        getWeather(lat,lon)
      })
      
      
    }).catch((error)=>{
      console.log(error);
      
    })
  }
  const getWeather=(lat:String,lon:String)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ca634b148bb14136e1aae3df6937ee78&units=metric`)
    .then((res)=>{
      const response = res.json()
      response.then((resp)=>{
        console.log("coordinates",resp.main);
        SetTemperature(resp.main.temp);
        SetMaxTemp(resp?.main?.temp_max);
        SetMinTemp(resp?.main?.temp_min);
        SetHumidity(resp?.main?.humidity);
        SetresponseGet(true);
      })
      
      
    }).catch((error)=>{
      console.log(error);
      
    })
  }
  return (
    <>
    <h1 className=' my-5 mx-5'>Enter the place which you want to see the data</h1>
    <form className=' mx-5' onSubmit={handleSubmit((data) => getCoordinates(data?.location))}>
      <input className='border border-black' placeholder='Location' {...register('location')} />
      <input className=' bg-black text-white p-1 ml-1'  type="submit" />
    </form>
    {
      responseGet === true?(
        <>
        <div className=' flex'>
      <h1 className=' text-black mx-5 my-5'>Current Temperature</h1>
      <h1 className='mx-5 my-5'>{temperature}</h1>
    </div>
    <div className=' flex'>
      <h1 className=' text-black mx-5 my-5'>Min Temperature</h1>
      <h1 className='mx-5 my-5'>{minTemp}</h1>
      <h1 className=' text-black mx-5 my-5'>Max Temperature</h1>
      <h1 className='mx-5 my-5'>{maxTemp}</h1>
    </div>
    <div className=' flex'>
      <h1 className=' text-black mx-5 my-5'>Humidity</h1>
      <h1 className='mx-5 my-5'>{humidity}</h1>
    </div>
        </>
      ):null
    }
    

    </>
  );
}

export default App;
