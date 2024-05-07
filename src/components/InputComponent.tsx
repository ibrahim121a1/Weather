import React from 'react'
import { useForm } from 'react-hook-form';

interface Props {
    onResponse: (data: string) => void;
}

const InputComponent = ({ onResponse }:Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
  return (
    <>
    <h1 className=' my-5 mx-5'>Enter the place which you want to see the data</h1>
    <form className=' mx-5' onSubmit={handleSubmit((data) => onResponse(data?.location)
    )}>
      <input className='border border-black' placeholder='Location' {...register('location')} />
      <input className=' bg-black text-white p-1 ml-1'  type="submit" />
    </form>
    </>
  )
}

export default InputComponent