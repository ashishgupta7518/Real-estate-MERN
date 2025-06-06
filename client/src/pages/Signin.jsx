import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'

export default function Signin() {



  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })

  }

  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',

        body: JSON.stringify(formData),

      });


      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));

        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');


    } catch (error) {
      dispatch(signInFailure(error.message));

    }


  };


  return (
    <div className=' p-3 max-w-lg mx-auto'>
      <div className='flex justify-center gap-2 '><img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="" /><h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1> <img src="" alt="" /></div>

      <form onSubmit={handleSubmit} className='flex flex-col  gap-4 '>

        <input type="email" placeholder='email' className='border p-3 rounded-lg bg-gray-800' id='email' onChange={handleChange} />
        <input type="password" placeholder='password' className='border p-3 rounded-lg bg-gray-800' id='password' onChange={handleChange} />

        <button disabled={loading} className='bg-[#2563eb] text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 '>{loading ? 'Loading....' : 'Sign In'}</button>
        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont have an  account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>

      {error && <p className='text-red-500 text-center mt-3'>{error}</p>}
    </div>
  )
}
