import { ErrorMessage, Field } from 'formik';

/* Usage */
/* 
  <FormikControl
    control='textarea'
    name='corresponding field'
    label='input's label'
    placeholder='place holder'
    labelClassName='label className to modify label's styles'
    icon='use boxicons classes to make use of icon'
  />
*/

function TextArea(props) {
  const { label, name, labelClassName, ...rest } = props;

  return (
    <div className='form-v2__control flex-start'>
      <label
        htmlFor={name}
        className={`form-v2__label ${labelClassName ? labelClassName : ''}`}
      >
        {label}
      </label>

      <div className='form-v2__input-box flex-start'>
        <i className='bx bx-edit' style={{ top: '0.75em' }}></i>
        <Field
          as='textarea'
          id={name}
          name={name}
          {...rest}
          className='form-v2__input--textarea'
        />
        <ErrorMessage name={name}>
          {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
        </ErrorMessage>
      </div>
    </div>
  );
}

export default TextArea;
