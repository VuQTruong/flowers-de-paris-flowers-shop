import React from 'react';
import { useDispatch } from 'react-redux';
import CashIcon from '../../../assets/icons/payment-icons/cash-icon.png';
import VisaMasterIcon from '../../../assets/icons/payment-icons/credit-debit-icon.png';
import PaypalIcon from '../../../assets/icons/payment-icons/paypal-icon.png';
import { updateCheckoutInfo } from '../../../features/checkout/slice/checkout-slice';

function PaymentMethods({ value, onChange }) {
  const dispatch = useDispatch();

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
    dispatch(updateCheckoutInfo({ paymentMethod: e.target.value }));
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
