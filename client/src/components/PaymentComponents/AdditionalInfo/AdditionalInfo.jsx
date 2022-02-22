import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCheckoutInfo } from '../../../features/checkout/slice/checkout-slice';

function AdditionalInfo(props) {
  const dispatch = useDispatch();
  const { sender, message, note, useCard, card } = props;
  const { setSender, setMessage, setNote, setUseCard, setCard } = props;

  const { checkoutInfo } = useSelector((state) => state.checkout);

  const [isAnonymous, setIsAnonymous] = useState(checkoutInfo.isAnonymous);

  // todo: create APIs to create, update, get, and delete cards
  // todo: replace cardOptions by data getting from the server
  const cardOptions = [
    {
      id: 'birthday',
      value: {
        name: 'Birthday Card',
        price: 5,
      },
      label: 'Birthday Card',
    },
    {
      id: 'congratulation',
      value: {
        name: 'Congratulation Card',
        price: 5,
      },
      label: 'Congratulation Card',
    },
    {
      id: 'condolatory',
      value: {
        name: 'Condolatory Card',
        price: 5,
      },
      label: 'Condolatory Card',
    },
  ];

  const anonymousHandler = (e) => {
    if (e.target.checked) {
      setIsAnonymous(true);
      setSender('Anonymous');
      dispatch(
        updateCheckoutInfo({
          isAnonymous: true,
          sender: 'Anonymous',
        })
      );
    } else {
      setIsAnonymous(false);
      setSender('');
      dispatch(
        updateCheckoutInfo({
          isAnonymous: false,
          sender: '',
        })
      );
    }
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
            dispatch(
              updateCheckoutInfo({
                useCard: e.target.value,
              })
            );
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
          const optionValue = JSON.stringify(option.value);
          return (
            <div className='info__card-item' key={option.id}>
              <input
                type='radio'
                id={option.id}
                name='greeting'
                value={optionValue}
                checked={JSON.stringify(card) === optionValue}
                onChange={(e) => {
                  setCard(JSON.parse(e.target.value));
                  dispatch(
                    updateCheckoutInfo({
                      card: JSON.parse(e.target.value),
                    })
                  );
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
                dispatch(
                  updateCheckoutInfo({
                    sender: e.target.value,
                  })
                );
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
                dispatch(
                  updateCheckoutInfo({
                    message: e.target.value,
                  })
                );
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
                dispatch(
                  updateCheckoutInfo({
                    note: e.target.value,
                  })
                );
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalInfo;
