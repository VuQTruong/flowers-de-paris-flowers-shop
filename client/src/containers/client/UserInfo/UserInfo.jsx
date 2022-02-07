import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import FormikControl from '../../../formik/FormikControl';
import { dateFormat } from '../../../utilities/helpers';

const validationSchema = Yup.object({});

function UserInfo() {
  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo, loading } = currentUser;

  const formInitialValues = {
    name: userInfo ? userInfo.name : '',
    email: userInfo ? userInfo.email : '',
    phone: userInfo ? userInfo.phone : '',
    address: userInfo ? userInfo.address : '',
    gender: userInfo ? userInfo.gender : '',
    dateOfBirth: userInfo ? Date.parse(userInfo.dateOfBirth) : '',
    password: '',
    confirmPassword: '',
  };

  const updateInfoHandler = () => {};

  return (
    <section className='user-info__container'>
      <h3 className='user-info__title'>User Information</h3>
      <div className='user-info__content'>
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          onSubmit={updateInfoHandler}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form className='user-info__form'>
                <div className='form-v2__control'>
                  <label
                    htmlFor='name'
                    className='form-v2__label user-info__form-label'
                  >
                    Fullname
                  </label>
                  <div className='form-v2__input-box'>
                    <i className='bx bx-user'></i>
                    <Field
                      type='input'
                      id='name'
                      name='name'
                      placeholder='your fullname'
                      className='form-v2__input--text'
                    />
                    <ErrorMessage name='name'>
                      {(errorMsg) => (
                        <div className='form__error'>{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className='form-v2__control'>
                  <label
                    htmlFor='email'
                    className='form-v2__label user-info__form-label'
                  >
                    Email
                  </label>
                  <div className='form-v2__input-box'>
                    <i className='bx bx-envelope'></i>
                    <Field
                      type='email'
                      id='email'
                      name='email'
                      placeholder='email'
                      className='form-v2__input--text'
                    />
                    <ErrorMessage name='email'>
                      {(errorMsg) => (
                        <div className='form__error'>{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className='form-v2__control'>
                  <label
                    htmlFor='phone'
                    className='form-v2__label user-info__form-label'
                  >
                    Phone Number
                  </label>
                  <div className='form-v2__input-box'>
                    <i className='bx bx-phone'></i>
                    <Field
                      type='input'
                      id='phone'
                      name='phone'
                      placeholder='phone number'
                      className='form-v2__input--text'
                    />
                    <ErrorMessage name='phone'>
                      {(errorMsg) => (
                        <div className='form__error'>{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className='form-v2__control'>
                  <label
                    htmlFor='address'
                    className='form-v2__label user-info__form-label'
                  >
                    Address
                  </label>
                  <div className='form-v2__input-box'>
                    <i className='bx bx-home'></i>
                    <Field
                      type='input'
                      id='address'
                      name='address'
                      placeholder='address'
                      className='form-v2__input--text'
                    />
                    <ErrorMessage name='address'>
                      {(errorMsg) => (
                        <div className='form__error'>{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className='form-v2__control'>
                  <label
                    htmlFor='gender'
                    className='form-v2__label user-info__form-label'
                  >
                    Gender
                  </label>
                  <div className='form-v2__input-box'>
                    <i className='bx bx-user'></i>
                    <Field
                      type='input'
                      id='gender'
                      name='gender'
                      placeholder='gender'
                      className='form-v2__input--text'
                    />
                    <ErrorMessage name='gender'>
                      {(errorMsg) => (
                        <div className='form__error'>{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <FormikControl
                  control='date'
                  name='dateOfBirth'
                  label='Date Of Birth'
                  labelClassName='user-info__form-label'
                />

                <div className='form-v2__control'>
                  <label
                    htmlFor='password'
                    className='form-v2__label user-info__form-label'
                  >
                    Password
                  </label>
                  <div className='form-v2__input-box'>
                    <i className='bx bx-lock'></i>
                    <Field
                      type='password'
                      id='password'
                      name='password'
                      placeholder='new password'
                      className='form-v2__input--text'
                    />
                    <ErrorMessage name='password'>
                      {(errorMsg) => (
                        <div className='form__error'>{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className='form-v2__control'>
                  <label
                    htmlFor='confirmPassword'
                    className='form-v2__label user-info__form-label'
                  >
                    Confirm Password
                  </label>
                  <div className='form-v2__input-box'>
                    <i className='bx bx-lock'></i>
                    <Field
                      type='password'
                      id='confirmPassword'
                      name='confirmPassword'
                      placeholder='confirm new password'
                      className='form-v2__input--text'
                    />
                    <ErrorMessage name='confirmPassword'>
                      {(errorMsg) => (
                        <div className='form__error'>{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <button
                  type='submit'
                  className='btn btn-primary user-info__btn-update'
                  disabled={loading || !formik.isValid}
                >
                  {loading ? (
                    <i className='bx bx-loader-alt bx-spin bx-rotate-90'></i>
                  ) : (
                    'Update'
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
}

export default UserInfo;
