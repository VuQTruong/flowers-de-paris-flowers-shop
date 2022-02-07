import React from 'react';
import { Field, ErrorMessage } from 'formik';

/* Usage */
/*
  <FormikControl
    control='input'
    type='input'
    name='corresponding field'
    label='input's label'
    placeholder='place holder'
    labelClassName='label className to modify label's styles'
    icon='use boxicons classes to make use of icon'
  />
*/

function Input(props) {
  const { label, name, labelClassName, icon, ...rest } = props;

  return (
    <div className='form-v2__control'>
      <label
        htmlFor={name}
        className={`form-v2__label ${labelClassName ? labelClassName : ''}`}
      >
        {label}
      </label>
      <div className='form-v2__input-box'>
        <i className={icon}></i>
        <Field
          id={name}
          name={name}
          {...rest}
          className='form-v2__input--text'
        />
        <ErrorMessage name={name}>
          {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
        </ErrorMessage>
      </div>
    </div>
  );
}

export default Input;
