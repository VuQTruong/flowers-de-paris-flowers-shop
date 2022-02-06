import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signUp } from '../../../features/auth/current-user-slice';
import signUpImg from '../../../assets/images/register.jpg';

import swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { unwrapResult } from '@reduxjs/toolkit';

import ReCAPTCHA from 'react-google-recaptcha';

const formInitialValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Name must contain letters only')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Invalid phone number')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .max(20, 'Password must contain at most 20 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
      'Password must contain at least 1 letter, 1 number, and 1 special character (!@#$%^&*)'
    )
    .required('Password is requried'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Confirm password is not match')
    .required('Confirm password is required'),
});

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [reCaptchaToken, setReCaptchaToken] = useState(null);
  const reCaptchaRef = useRef();

  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo, loading } = currentUser;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const signUpHandler = async (values) => {
    try {
      const { confirmPassword, ...signUpValues } = values;
      signUpValues.reCaptchaToken = reCaptchaToken;

      const actionResult = await dispatch(signUp(signUpValues));
      const data = unwrapResult(actionResult);

      swal.fire({
        icon: 'success',
        title: 'Congratulations!',
        text: `Welcome to our shop, ${data.name}!`,
      });
    } catch (error) {
      swal
        .fire({
          icon: 'error',
          title: 'Oops!...',
          text: error.message,
        })
        .then(() => reCaptchaRef.current.reset());
    }
  };

  const recaptchaHandler = (token) => {
    if (token) {
      setReCaptchaToken(token);
    }
  };

  return (
    <main className='signup__bg'>
      <div className='container'>
        <section className='signup__panel'>
          <div className='signup__content'>
            <h2>Sign Up</h2>

            <Formik
              initialValues={formInitialValues}
              validationSchema={validationSchema}
              onSubmit={signUpHandler}
            >
              {(formik) => {
                return (
                  <Form className='signup__form'>
                    <div className='form__control'>
                      <div className='form__input-box'>
                        <i className='bx bx-user'></i>
                        <Field
                          type='input'
                          id='name'
                          name='name'
                          placeholder='your fullname'
                          className='form__input--text'
                        />
                        <label htmlFor='name' className='form__label--hidden'>
                          Fullname
                        </label>
                      </div>
                      <ErrorMessage name='name'>
                        {(errorMsg) => (
                          <div className='form__error'>{errorMsg}</div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className='form__control'>
                      <div className='form__input-box'>
                        <i className='bx bx-envelope'></i>
                        <Field
                          type='email'
                          id='email'
                          name='email'
                          placeholder='email'
                          className='form__input--text'
                        />
                        <label htmlFor='email' className='form__label--hidden'>
                          Email
                        </label>
                      </div>
                      <ErrorMessage name='email'>
                        {(errorMsg) => (
                          <div className='form__error'>{errorMsg}</div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className='form__control'>
                      <div className='form__input-box'>
                        <i className='bx bx-phone'></i>
                        <Field
                          type='input'
                          id='phone'
                          name='phone'
                          placeholder='phone number'
                          className='form__input--text'
                        />
                        <label htmlFor='phone' className='form__label--hidden'>
                          Phone Number
                        </label>
                      </div>
                      <ErrorMessage name='phone'>
                        {(errorMsg) => (
                          <div className='form__error'>{errorMsg}</div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className='form__control'>
                      <div className='form__input-box'>
                        <i className='bx bx-lock'></i>
                        <Field
                          type='password'
                          id='password'
                          name='password'
                          placeholder='password'
                          className='form__input--text'
                        />
                        <label
                          htmlFor='password'
                          className='form__label--hidden'
                        >
                          Password
                        </label>
                      </div>
                      <ErrorMessage name='password'>
                        {(errorMsg) => (
                          <div className='form__error'>{errorMsg}</div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className='form__control'>
                      <div className='form__input-box'>
                        <i className='bx bx-lock'></i>
                        <Field
                          type='password'
                          id='confirmPassword'
                          name='confirmPassword'
                          placeholder='confirm password'
                          className='form__input--text'
                        />
                        <label
                          htmlFor='confirmPassword'
                          className='form__label--hidden'
                        >
                          Confirm Password
                        </label>
                      </div>
                      <ErrorMessage name='confirmPassword'>
                        {(errorMsg) => (
                          <div className='form__error'>{errorMsg}</div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className='signup__captcha'>
                      <ReCAPTCHA
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        size='normal'
                        onChange={recaptchaHandler}
                        ref={reCaptchaRef}
                      />
                    </div>

                    <button
                      type='submit'
                      className='btn btn-primary signup__btn-signup'
                      disabled={!reCaptchaToken || loading || !formik.isValid}
                    >
                      {loading ? (
                        <i className='bx bx-loader-alt bx-spin bx-rotate-90'></i>
                      ) : (
                        'Sign up'
                      )}
                    </button>
                  </Form>
                );
              }}
            </Formik>

            <footer className='signup__footer'>
              Already a member?{' '}
              <span>
                <Link to='/signin' className='signup__link'>
                  Sign In
                </Link>
              </span>
            </footer>
          </div>

          <img src={signUpImg} alt='Sign In' className='signup__image' />
        </section>
      </div>
    </main>
  );
}

export default Signup;
