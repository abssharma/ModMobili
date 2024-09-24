import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import backgroundImage from '../assets/bg2.gif';
import { login } from '../auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const loginUser = (data) => {
    console.log(data);

    const requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    fetch('http://127.0.0.1:5000/auth/login', requestOptions)
      .then(res => {
        if (!res.ok) {
          throw new Error('Login failed');
        }
        return res.json();
      })
      .then(data => {
        console.log(data.access_token);
        login(data.access_token);
        navigate('/');
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Login failed. Please check your credentials and try again.');
      });

    reset();
  };

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      
      <div className="flex justify-center items-center h-full">
        <form 
          onSubmit={handleSubmit(loginUser)} 
          className="w-full max-w-lg bg-white bg-opacity-10 backdrop-blur-md shadow-md rounded px-8 pt-6 pb-8"
        >
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              {...register("username", { required: true, maxLength: 25 })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.username && <p style={{color:'yellow'}}> <small>Username is required</small></p>}
            {errors.username?.type === "maxLength" && <p style={{color:'yellow'}}> <small>Maximum characters should be 25</small></p>}
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true, minLength: 8 })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && <p style={{color:'yellow'}}> <small>Password is required</small></p>}
            {errors.password?.type === "minLength" && <p style={{color:'yellow'}}> <small>Minimum characters should be 8</small></p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </div>
          <small className='text-white'>
            Do you have an account?
            <div className="text-blue-400">
              <Link to='/signup'> Create One </Link>
            </div>
          </small>
        </form>
      </div>
    </div>
  );
}

export default Login;
