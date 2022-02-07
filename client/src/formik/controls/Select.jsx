import React from 'react';
import { ErrorMessage, Field } from 'formik';

/* Usage */
/*
  <FormikControl
    control='select'
    name='corresponding field'
    label='select's label'
    options={selectOptions}
    labelClassName='label className to modify label's styles'
    icon='use boxicons classes to make use of icon'
  />

  const selectOptions = [
    { key: 'Select an option', value: '' },
    { key: 'Option 1', value: 'option1' },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option3' },
  ];
*/
function Select(props) {
  const { label, name, options, labelClassName, icon, ...rest } = props;

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
          as='select'
          id={name}
          name={name}
          className='form-v2__input--text'
          {...rest}
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.key}
              </option>
            );
          })}
        </Field>
        <ErrorMessage name={name}>
          {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
        </ErrorMessage>
      </div>
    </div>
  );
}

export default Select;
