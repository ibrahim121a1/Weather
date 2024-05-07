import React,{useState} from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import { error } from 'console';
import InputComponent from './components/InputComponent';
import OutputComponent from './components/OutputComponent';

function App() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [temperature,setTemperature] = useState<string>('');
  const [minTemp,setminTemp] = useState<string>('');
  const [maxTemp,setmaxTemp] = useState<string>('');
  const [humidity,setHumidity] = useState<string>('');
  const [responseGet,SetresponseGet] = useState<boolean>(false);
  const getCoordinates= async (location:string)=>{
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
  const getWeather=(lat:string,lon:string)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ca634b148bb14136e1aae3df6937ee78&units=metric`)
    .then((res)=>{
      const response = res.json()
      response.then((resp)=>{
        console.log("coordinates",resp.main);
        setTemperature(resp.main.temp);
        setmaxTemp(resp?.main?.temp_max);
        setminTemp(resp?.main?.temp_min);
        setHumidity(resp?.main?.humidity);
        SetresponseGet(true);
      })
      
      
    }).catch((error)=>{
      console.log(error);
      
    })
  }
  return (
    <>
    <InputComponent onResponse={(loc)=>{
      getCoordinates(loc)
    }}/>
    {
      responseGet?(
        <>
        <OutputComponent temperature={temperature} minTemp={minTemp?.toString()} maxTemp={maxTemp?.toString()} humidity={humidity?.toString()}/>
        </>
      ):null
    }
    

    </>
  );
}

export default App;
