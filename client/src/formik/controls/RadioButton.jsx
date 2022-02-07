import { ErrorMessage, Field } from 'formik';

/* Usage */
/*
  <FormikControl
    control='radio'
    name='corresponding field'
    label='radio group's label'
    options={radioOptions}
    labelClassName='label className to modify label's styles'
    rowOptionsDirection, // ?optional: change direction to row, default to column
    reverseOptionLabel, // ?optional: change the option's label position, default to the left of the radio button
  />

  const radioOptions = [
    { key: 'Option 1', value: 'rOption1' },
    { key: 'Option 2', value: 'rOption2' },
    { key: 'Option 3', value: 'rOption3' },
  ];
*/

function RadioButton(props) {
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
          className={`form-v2__radio-options ${
            rowOptionsDirection ? 'row' : 'column'
          }`}
        >
          <Field name={name} {...rest}>
            {({ field }) => {
              return options.map((option) => {
                return (
                  <div
                    className={`form-v2__radio-item ${
                      reverseOptionLabel ? 'reverse' : ''
                    }`}
                    key={option.key}
                  >
                    <input
                      type='radio'
                      id={option.value}
                      {...field}
                      value={option.value}
                      checked={field.value === option.value}
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

// !Note: The position of the {...field} must be exactly at that position, before setting the value and the checked property. Because this is where the "name" attribute is set, so that we can group the radio buttons together and handle the change of the radio buttons group. More than that, the "field" also has a "value" property, which is the value of the entire group. So we need to override the value property of this input by the "option.value", otherwise, all of the radio buttons will have the same value.

export default RadioButton;
