import { ErrorMessage, Field } from 'formik';

/* Usage */
/*
  <FormikControl
    control='checkbox'
    name='corresponding field'
    label='checkbox group's label'
    options={checkboxOptions}
    labelClassName='label className to modify label's styles'
    rowOptionsDirection, // ?optional: change direction to row, default to column
    reverseOptionLabel, // ?optional: change the option's label position, default to the left of the checkbox
  />

  const checkboxOptions = [
    { key: 'Option 1', value: 'cbOption1' },
    { key: 'Option 2', value: 'cbOption2' },
    { key: 'Option 3', value: 'cbOption3' },
  ]
*/

function CheckBox(props) {
  const {
    label,
    name,
    options,
    labelClassName,
    rowOptionsDirection,
    reverseOptionLabel,
    ...rest
  } = props;

  return (
    <div className='form-v2__control flex-start'>
      <label
        className={`form-v2__label ${labelClassName ? labelClassName : ''}`}
      >
        {label}
      </label>

      <div className='form-v2__input-box'>
        <div
          className={`form-v2__cb-options ${
            rowOptionsDirection ? 'row' : 'column'
          }`}
        >
          <Field name={name} {...rest}>
            {({ field }) => {
              return options.map((option) => {
                return (
                  <div
                    className={`form-v2__cb-item ${
                      reverseOptionLabel ? 'reverse' : ''
                    }`}
                    key={option.key}
                  >
                    <input
                      type='checkbox'
                      id={option.value}
                      {...field}
                      value={option.value}
                      checked={field.value.includes(option.value)}
                    />
                    <label htmlFor={option.value}>{option.key}</label>
                  </div>
                );
              });
            }}
          </Field>
        </div>
        <ErrorMessage name={name}>
          {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
        </ErrorMessage>
      </div>
    </div>
  );
}

export default CheckBox;
