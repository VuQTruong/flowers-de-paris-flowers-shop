import React from 'react';
import CashIcon from '../../../assets/icons/payment-icons/cash-icon.png';
import VisaMasterIcon from '../../../assets/icons/payment-icons/credit-debit-icon.png';
import PaypalIcon from '../../../assets/icons/payment-icons/paypal-icon.png';

function PaymentMethods({ value, onChange }) {
  const options = [
    {
      id: 'cash',
      label: 'Cash On Delivery',
      value: 'cash',
      icon: CashIcon,
    },
    {
      id: 'visa',
      label: 'Pay by Visa/Master Card',
      value: 'credit',
      icon: VisaMasterIcon,
    },
    {
      id: 'paypal',
      label: 'Pay by Paypal',
      value: 'paypal',
      icon: PaypalIcon,
    },
  ];

  const onChangeHandler = (e) => {
    onChange(e.target.value);

    const checkoutInfo =
      JSON.parse(sessionStorage.getItem('checkoutInfo')) || {};
    checkoutInfo.paymentMethod = e.target.value;
    sessionStorage.setItem('checkoutInfo', JSON.stringify(checkoutInfo));
  };

  return (
    <div className='payment-method'>
      <h3>Payment methods</h3>

      {options.map((option) => {
        return (
          <div className='payment-method__item' key={option.id}>
            <input
              type='radio'
              id={option.id}
              name='payment'
              value={option.value}
              onChange={onChangeHandler}
              checked={value === option.value}
            />
            <label htmlFor={option.id} className='payment-method__label'>
              <img
                src={option.icon}
                alt={option.value}
                className='payment-method__icon'
              />
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default PaymentMethods;
