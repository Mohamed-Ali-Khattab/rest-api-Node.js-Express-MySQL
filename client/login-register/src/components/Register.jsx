import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import validation from '../function/Registervalidation';

function Register() {
  const [values, setValues] = useState({
    name: '',
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

    if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
      try {
        const res = await axios.post('http://localhost:8080/user/register', values);
        if (res.data.message === 'user created successfully') {
          navigate('/login');
        } else {
          alert('Something went wrong');
        }
      } catch (error) {
        if (error.response?.status === 409) {
          alert('Erreur 409 : E-mail already exists!');
        } else {
          alert('Une erreur est survenue');
        }
      }
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-4 rounded w-25'>
        <h2 className='mb-4'>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter name'
              onChange={handleChange}
              className='form-control rounded-0'
            />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>

          <div className='mb-3'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter email'
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
              placeholder='Enter password'
              onChange={handleChange}
              className='form-control rounded-0'
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>

          <button type='submit' className='btn btn-success btn-lg w-100 rounded-0'>
            Register
          </button>
          <p className='mt-2 small text-muted'>You agree to our terms and policies</p>
        </form>
      </div>
    </div>
  );
}

export default Register;
