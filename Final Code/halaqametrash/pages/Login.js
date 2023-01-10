import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import * as yup from 'yup';

const Login = ({ user }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: () => {
      return yup.object({
        email: yup
          .string()
          .required('Email is required')
          .email('Please enter a valid email!'),
        password: yup.string().required('Password is required!'),
      });
    },
    onSubmit: async (values) => {
      await axios
        .post(`/api/auth/login`, values)
        .then((res) => {
          toast.success('Logged in successfully!');
          localStorage.setItem('$userToken', JSON.stringify(res.data.token));
          localStorage.setItem('$user', JSON.stringify(res.data));
          setTimeout(() => {
            window.location = '/announcements';
          }, 1500);
        })
        .catch((err) => {
          toast.error(`${err.response.data.message}`);
        });
    },
  });

  return (
    <>
      <div className='wrapper fadeInDown'>
        <div id='formContent'>
          <h2 className='active'> Sign In </h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              type='email'
              id='email'
              className='fadeIn second'
              name='email'
              placeholder='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && Boolean(formik.errors.email) && (
              <>
                <div className='err'>{formik.errors.email}</div>
              </>
            )}
            <input
              type='text'
              id='password'
              className='fadeIn third'
              name='password'
              placeholder='Password'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && Boolean(formik.errors.password) && (
              <>
                <div className='err'>{formik.errors.password}</div>
              </>
            )}
            <input
              type='button'
              className='fadeIn fourth'
              style={{ cursor: 'pointer' }}
              value='Log In'
              onClick={formik.handleSubmit}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
