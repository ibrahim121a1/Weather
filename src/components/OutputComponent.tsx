import React from 'react'

interface OutputDataType{
    temperature:string,
    minTemp:string,
    maxTemp:string,
    humidity:string
}
const OutputComponent = ({temperature,minTemp,maxTemp,humidity}:OutputDataType) => {
  return (
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
  )
}

export default OutputComponent