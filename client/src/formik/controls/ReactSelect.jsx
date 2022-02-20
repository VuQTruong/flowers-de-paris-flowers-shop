import { ErrorMessage, Field } from 'formik';
import Select from 'react-select';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    boxShadow: '0 0 0.5em rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',

    borderColor: state.isFocused ? '#ffd700' : '#CED4DA',
    '&:hover': {
      borderColor: state.isFocused ? '#ffd700' : '#CED4DA',
    },
    borderWidth: '2px',
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    zIndex: 2,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    marginLeft: '1.25em',
    padding: '0.3em',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontStyle: 'italic',
    fontSize: '0.75rem',
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: 2,
  }),
};

function ReactSelect(props) {
  const { label, name, options, placeholder, icon, labelClassName, ...rest } =
    props;

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
        <Field name={name} {...rest}>
          {(props) => {
            const { field, form } = props;

            return (
              <Select
                name={field.name}
                options={options}
                value={
                  options
                    ? options.find(
                        (option) =>
                          JSON.stringify(option.value) ===
                          JSON.stringify(field.value)
                      )
                    : ''
                }
                onChange={(option) =>
                  form.setFieldValue(field.name, option.value)
                }
                onBlur={field.onBlur}
                placeholder={placeholder}
                styles={customStyles}
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

export default ReactSelect;
