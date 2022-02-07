import React from 'react';
import Input from './controls/Input';
import TextArea from './controls/TextArea';
import Select from './controls/Select';
import RadioButton from './controls/RadioButton';
import CheckBox from './controls/CheckBox';
import DatePicker from './controls/DatePicker';

function FormikControl(props) {
  const { control, ...rest } = props;

  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'textarea':
      return <TextArea {...rest} />;
    case 'select':
      return <Select {...rest} />;
    case 'radio':
      return <RadioButton {...rest} />;
    case 'checkbox':
      return <CheckBox {...rest} />;
    case 'date':
      return <DatePicker {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
