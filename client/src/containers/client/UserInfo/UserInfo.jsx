import React, { useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import FormikControl from '../../../formik/FormikControl';

import swal from 'sweetalert2';
import { unwrapResult } from '@reduxjs/toolkit';
import { updateUserInfo } from '../../../features/user/update-user';
import { signOut } from '../../../features/user/sign-out';
import { useNavigate } from 'react-router-dom';

const genderOptions = [
  { key: 'Select an option', value: '' },
  { key: 'She/her', value: 'she' },
  { key: 'He/him', value: 'he' },
  { key: 'They/them', value: 'they' },
  { key: 'Prefer not to response', value: 'not response' },
];

const changePasswordOptions = [
  { key: 'Yes, I want to change the password', value: 'true' },
  { key: 'No, keep the current password', value: 'false' },
];

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Name must contain letters only')
    .required('Name is required'),
  email: Yup.string().email('Invalid email'),
  phone: Yup.string().matches(/^[0-9]+$/, 'Invalid phone number'),
  address: Yup.string(),
  gender: Yup.string(),
  password: Yup.string()
    .min(8, 'Password must contain at least 8 characters')
    .max(20, 'Password must contain at most 20 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
      'Password must contain at least 1 letter, 1 number, and 1 special character (!@#$%^&*)'
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Confirm password is not match'
  ),
  changePassword: Yup.string(),
});

function UserInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formikRef = useRef(null);

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
    changePassword: 'false',
  };

  const updateInfoHandler = async (values) => {
    if (!formikRef.current.dirty) {
      swal.fire({
        icon: 'success',
        title: 'Huh!?...',
        text: 'There is nothing changed to be saved!',
      });

      return;
    }

    const { confirmPassword, changePassword, ...updateInfoValues } = values;

    if (userInfo.email) {
      delete updateInfoValues.email;
    }

    if (userInfo.phone) {
      delete updateInfoValues.phone;
    }

    if (values.changePassword === 'false') {
      delete updateInfoValues.password;
    }

    try {
      const actionResult = await dispatch(updateUserInfo(updateInfoValues));
      await unwrapResult(actionResult);

      swal
        .fire({
          icon: 'success',
          title: 'Congratulations!',
          text:
            values.changePassword === 'false'
              ? 'You have been updated your profile successfully!'
              : 'You have been updated your profile successfully! Please sign in again with your new password!',
        })
        .then(async () => {
          if (values.changePassword === 'true') {
            const actionResult = await dispatch(signOut());
            await unwrapResult(actionResult);

            navigate('/');
          }
        });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.message,
      });
    }
  };

  return (
    <section className='user-info__container'>
      <h3 className='user-info__title'>User Information</h3>
      <div className='user-info__content'>
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          onSubmit={updateInfoHandler}
          enableReinitialize
          innerRef={formikRef}
        >
          {(formik) => {
            return (
              <Form className='user-info__form'>
                <FormikControl
                  control='input'
                  type='input'
                  name='name'
                  label='Fullname'
                  placeholder='your fullname'
                  labelClassName='user-info__form-label'
                  icon='bx bx-user'
                />

                <FormikControl
                  control='input'
                  type='email'
                  name='email'
                  label='Email'
                  placeholder='example@gmail.com'
                  labelClassName='user-info__form-label'
                  icon='bx bx-envelope'
                  disabled={userInfo.email}
                />

                <FormikControl
                  control='input'
                  type='input'
                  name='phone'
                  label='Phone Number'
                  placeholder='phone number'
                  labelClassName='user-info__form-label'
                  icon='bx bx-phone'
                  disabled={userInfo.phone}
                />

                <FormikControl
                  control='input'
                  type='input'
                  name='address'
                  label='Address'
                  placeholder='123 example street, example city, postal code'
                  labelClassName='user-info__form-label'
                  icon='bx bx-home'
                />

                <FormikControl
                  control='select'
                  options={genderOptions}
                  name='gender'
                  label='Gender'
                  labelClassName='user-info__form-label'
                  icon='bx bx-user'
                />

                <FormikControl
                  control='date'
                  name='dateOfBirth'
                  label='Date Of Birth'
                  labelClassName='user-info__form-label'
                />

                <FormikControl
                  control='radio'
                  name='changePassword'
                  label='Change Password?'
                  options={changePasswordOptions}
                  labelClassName='user-info__form-label'
                />

                <div
                  className={
                    formik.values.changePassword === 'false'
                      ? 'user-info__password-section--hide'
                      : ''
                  }
                >
                  <FormikControl
                    control='input'
                    type='password'
                    name='password'
                    label='Password'
                    placeholder='new password'
                    labelClassName='user-info__form-label'
                    icon='bx bx-lock'
                  />

                  <FormikControl
                    control='input'
                    type='password'
                    name='confirmPassword'
                    label='Confirm Password'
                    placeholder='confirm new password'
                    labelClassName='user-info__form-label'
                    icon='bx bx-lock'
                  />
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
