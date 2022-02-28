import React, { useState } from 'react';

/* Usage */
/*
    <ChipInput
        label=''
        placeholder=''
        chips={chips}
        onUpdate={(newChipsArray) => setChips(newChipsArray)}
        labelClassname='label className to modify label's styles'
        inputClassname=''
        icon=''
    />

    !an array state that manage the chips
    const [chips, setChips] = useState([]);
*/

function ChipInput(props) {
  const {
    label,
    placeholder,
    chips,
    onUpdate,
    labelClassname,
    icon,
    readOnly,
  } = props;

  const [chipInput, setChipInput] = useState('');

  const removeChip = (chipName) => {
    const newChipsArray = chips.filter((chip) => chip !== chipName);
    onUpdate(newChipsArray);
  };

  const editChips = (e) => {
    if (e.key === 'Enter' && chipInput !== '') {
      if (chipInput !== '' && !chips.includes(chipInput)) {
        const newChipsArray = [...chips, chipInput];
        onUpdate(newChipsArray);
      }
      setChipInput('');
    }

    if (e.key === 'Backspace' && chipInput === '') {
      if (chips.length !== 0) {
        const newChipsArray = [...chips];
        newChipsArray.pop();
        onUpdate(newChipsArray);
      }
    }
  };

  const onKeyPressHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className='chip-input__control flex-start'>
      <label htmlFor='chip' className={labelClassname}>
        {label}
      </label>
      <div
        className={`chip-input__input-box ${
          labelClassname ? labelClassname : ''
        }`}
      >
        <i className={icon ? icon : 'bx bx-purchase-tag'}></i>
        <ul className='chip-input__chip-list'>
          {chips.map((chip, index) => (
            <li className={`chip-input__chip-item`} key={index}>
              <span>{chip}</span>
              <i className='bx bx-x' onClick={() => removeChip(chip)}></i>
            </li>
          ))}
        </ul>

        <input
          name='chip'
          id='chip'
          readOnly={readOnly}
          placeholder={placeholder}
          value={chipInput}
          onChange={(e) => setChipInput(e.target.value)}
          onKeyUp={editChips}
          onKeyPress={onKeyPressHandler}
          autoComplete='off'
          className='chip-input__input'
        />
      </div>
    </div>
  );
}

export default ChipInput;
