import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './login.css';
import validation from '../function/LoginValidation';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      try {
        const res = await axios.post('http://localhost:8080/user/login', values);
        if (res.data.message === 'authentification successfully') {
          console.log(res.data.token); // tu peux le stocker dans localStorage si besoin
          navigate('/');
        }
      } catch (error) {
        if (error.response?.status === 401) {
          alert('Erreur 401 : Invalid E-mail!');
        } else {
          alert('Erreur 500 : Invalid Password!');
        }
      }
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='container bg-white p-4 rounded w-25'>
        <h2 className='mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter Email'
              onChange={handleChange}
              className='form-control rounded-0'
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>

          <div className='mb-3'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter Password'
              onChange={handleChange}
              className='form-control rounded-0'
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>

          <button type='submit' className='btn btn-primary btn-lg w-100 rounded-0'>
            Login
          </button>

          <p className='mt-3'>
            Don't have an account?{' '}
            <Link className='btn btn-link p-0' to='/register'>
              Register now
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
