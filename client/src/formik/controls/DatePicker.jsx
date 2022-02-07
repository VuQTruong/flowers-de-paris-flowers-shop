import DateView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Field, ErrorMessage } from 'formik';

/* Usage */
/*
  <FormikControl
    control='date'
    name='corresponding field'
    label='input's label'
    labelClassName='label className to modify label's styles'
  />

  !Note: If the value of date is in the mongodb's format, we must parse it to Date object using Date.parse(createdAt)
*/

function DatePicker(props) {
  const { label, name, labelClassName, ...rest } = props;

  return (
    <div className='form-v2__control'>
      <label
        htmlFor={name}
        className={`form-v2__label ${labelClassName ? labelClassName : ''}`}
      >
        {label}
      </label>
      <div className='form-v2__input-box'>
        <i className='bx bx-calendar' style={{ zIndex: 1 }}></i>
        <Field name={name}>
          {({ field, form }) => {
            // Allow us to manually set the value of the field
            const { setFieldValue } = form;

            // Get the current value of the field
            const { value } = field;

            return (
              <DateView
                id={name}
                {...field}
                {...rest}
                selected={value}
                onChange={(date) => setFieldValue(name, date)}
                className='form-v2__input--text'
              />
            );
          }}
        </Field>

        <ErrorMessage name={name}>
          {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
        </ErrorMessage>
      </div>
    </div>
  );
}

export default DatePicker;
