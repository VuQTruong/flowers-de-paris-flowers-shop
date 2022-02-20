import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import CheckoutSteps from '../../../components/CheckoutSteps/CheckoutSteps';
import PaymentMethods from '../../../components/PaymentMethods/PaymentMethods';

function Payment() {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.currentUser);
  const { cartItems } = useSelector((state) => state.cart);
  const { deliveryInfo } = useSelector((state) => state.delivery);

  const [payment, setPayment] = useState('');

  useEffect(() => {
    if (!userInfo) {
      swal
        .fire({
          icon: 'warning',
          title: 'Oops!...',
          text: 'Please sign in to access this page',
        })
        .then(() => {
          navigate('/signin?redirect=payment');
        });
    } else if (cartItems.length === 0) {
      swal
        .fire({
          icon: 'info',
          title: 'Uh oh!...',
          text: `You don't have any items in your cart to proceed to payment. Let's go shopping`,
        })
        .then(() => {
          navigate('/');
        });
    } else if (!deliveryInfo) {
      swal
        .fire({
          icon: 'info',
          title: 'Uh oh!...',
          text: `You haven't told us who should we send your beautiful flowers to`,
        })
        .then(() => {
          navigate('/signin?redirect=delivery');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <CheckoutSteps step1 step2 step3 />

      <div className='payment-panel'>
        <PaymentMethods
          value={payment}
          onChange={(value) => setPayment(value)}
        />
      </div>
    </div>
  );
}

export default Payment;
