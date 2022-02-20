import React from 'react';
import { useState } from 'react';

function AdditionalInfo(props) {
  const { sender, message, note, useCard, card } = props;
  const { setSender, setMessage, setNote, setUseCard, setCard } = props;

  const checkoutInfo = JSON.parse(sessionStorage.getItem('checkoutInfo'));
  const [isAnonymous, setIsAnonymous] = useState(
    (checkoutInfo.isAnonymous && checkoutInfo.isAnonymous) || false
  );

  const cardOptions = [
    {
      id: 'birthday',
      value: 'Birthday Card',
      label: 'Birthday Card',
    },
    {
      id: 'congratulation',
      value: 'Congratulation Card',
      label: 'Congratulation Card',
    },
    {
      id: 'condolatory',
      value: 'Condolatory Card',
      label: 'Condolatory Card',
    },
  ];

  const anonymousHandler = (e) => {
    if (e.target.checked) {
      setIsAnonymous(true);
      setSender('Anonymous');
    } else {
      setIsAnonymous(false);
      setSender('');
    }
    setValueToStorage('isAnonymous', e.target.checked);
  };

  const setValueToStorage = (field, value) => {
    const checkoutInfo =
      JSON.parse(sessionStorage.getItem('checkoutInfo')) || {};
    checkoutInfo[field] = value;
    sessionStorage.setItem('checkoutInfo', JSON.stringify(checkoutInfo));
  };

  return (
    <div className='info__container'>
      <h3>Additional Information</h3>

      <div className='info__item'>
        <input
          type='checkbox'
          id='wrap'
          name='wrap'
          onChange={(e) => {
            setUseCard(e.target.checked);
            setValueToStorage('useCard', e.target.value);
          }}
          checked={useCard}
        />
        <label htmlFor='wrap' className='info__label'>
          Use Card
        </label>
      </div>

      <div
        className={`accordion box ${useCard ? 'active' : ''}`}
        style={{ margin: '0 2rem' }}
      >
        {cardOptions.map((option) => {
          return (
            <div className='info__card-item' key={option.id}>
              <input
                type='radio'
                id={option.id}
                name='greeting'
                value={option.value}
                checked={card === option.value}
                onChange={(e) => {
                  setCard(e.target.value);
                  setValueToStorage('card', e.target.value);
                }}
              />
              <label htmlFor={option.id} className='info__label'>
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      <div className='info__item'>
        <input
          type='checkbox'
          id='anonymous'
          name='anonymous'
          value='anonymous'
          onChange={anonymousHandler}
          checked={isAnonymous}
        />
        <label htmlFor='anonymous' className='info__label'>
          Send as Anonymous
        </label>
      </div>

      <div className='info__form'>
        <div className='form-v2__control'>
          <label htmlFor='sender' className='form-v2__label info__input-label'>
            From
          </label>
          <div className='form-v2__input-box'>
            <i className='bx bx-user'></i>
            <input
              type='input'
              name='sender'
              placeholder='sender'
              className='form-v2__input--text'
              required
              value={sender}
              onChange={(e) => {
                setSender(e.target.value);
                setValueToStorage('sender', e.target.value);
              }}
              disabled={isAnonymous ? true : false}
            ></input>
          </div>
        </div>

        <div className='form-v2__control flex-start'>
          <label htmlFor='note' className='form-v2__label info__input-label'>
            Message
          </label>

          <div className='form-v2__input-box'>
            <i
              className='bx bx-message-square-dots'
              style={{ top: '0.75em' }}
            ></i>
            <textarea
              placeholder='message'
              className='form-v2__input--text'
              name='message'
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setValueToStorage('message', e.target.value);
              }}
            ></textarea>
          </div>
        </div>

        <div className='form-v2__control flex-start'>
          <label htmlFor='note' className='form-v2__label info__input-label'>
            Notice
          </label>

          <div className='form-v2__input-box'>
            <i className='bx bx-edit' style={{ top: '0.75em' }}></i>
            <textarea
              placeholder='other notes'
              className='form-v2__input--text'
              name='note'
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                setValueToStorage('note', e.target.value);
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfo;
