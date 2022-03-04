import React from 'react';
import signInImg from '../../../assets/images/signin.jpg';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { signIn } from '../../../features/users/sign-in';
import { unwrapResult } from '@reduxjs/toolkit';
import swal from 'sweetalert2';
import { BASE_URL } from '../../../constants';

const validationSchema = Yup.object({
  username: Yup.string().required('Email or Phone number is required'),
  password: Yup.string().required('Password is required'),
});

const formInitialValues = {
  username: '',
  password: '',
};

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo, loading } = currentUser;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    window.scroll(0, 0);

    if (userInfo) {
      navigate(`/${redirect === '/' ? '' : redirect}`, { replace: true });
    }
  }, [navigate, redirect, userInfo]);

  const signInHandler = async (values) => {
    try {
      const actionResult = await dispatch(signIn(values));
      const data = unwrapResult(actionResult);

      swal.fire({
        icon: 'success',
        title: `Yay!...`,
        text: `Welcome back, ${data.name}!`,
      });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.message,
      });
    }
  };

  const googleSignInHandler = () => {
    window.open(`${BASE_URL}api/auth/google`, '_self');
  };

  const facebookSignInHandler = () => {
    window.open(`${BASE_URL}api/auth/facebook`, '_self');
  };

  return (
    <main className='signin__bg'>
      <div className='container'>
        <section className='signin__panel'>
          <img src={signInImg} alt='Sign In' className='signin__image' />

          <section className='signin__content'>
            <h2>Sign In</h2>
            <button
              className='btn signin__social google'
              onClick={googleSignInHandler}
            >
              <i className='bx bxl-google signin__social-icon'></i>
              <span>Sign in with Google</span>
            </button>
            <button
              className='btn signin__social facebook'
              onClick={facebookSignInHandler}
            >
              <i className='bx bxl-facebook-square signin__social-icon'></i>
              <span>Sign in with Facebook</span>
            </button>

            <div className='signin__divider'>or</div>

            <Formik
              initialValues={formInitialValues}
              validationSchema={validationSchema}
              onSubmit={signInHandler}
            >
              {(formik) => {
                return (
                  <Form className='signin__form'>
                    <div className='form__control'>
                      <div className='form__input-box'>
                        <i className='bx bx-envelope'></i>
                        <Field
                          type='input'
                          id='username'
                          name='username'
                          placeholder='email/phone number'
                          className='form__input--text'
                        />
                        <label
                          htmlFor='username'
                          className='form__label--hidden'
                        >
                          Email/Phone number
                        </label>
                      </div>
                      <ErrorMessage name='username'>
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

                    <div className='flex col'>
                      <button
                        type='submit'
                        className='btn btn-primary signin__btn-login'
                        disabled={loading || !formik.isValid}
                      >
                        {loading ? (
                          <i className='bx bx-loader-alt bx-spin bx-rotate-90'></i>
                        ) : (
                          'Login'
                        )}
                      </button>
                      <Link
                        to='/forgotpassword'
                        className='signin__link signin__forgot-pw'
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </Form>
                );
              }}
            </Formik>

            <footer className='signin__footer'>
              Not a member?{' '}
              <span>
                <Link to='/signup' className='signin__link'>
                  Sign Up
                </Link>
              </span>
            </footer>
          </section>
        </section>
      </div>
    </main>
  );
}

export default Signin;
