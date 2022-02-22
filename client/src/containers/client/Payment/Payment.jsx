import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import CheckoutSteps from '../../../components/CheckoutSteps/CheckoutSteps';
import AdditionalInfo from '../../../components/PaymentComponents/AdditionalInfo/AdditionalInfo';
import PaymentMethods from '../../../components/PaymentComponents/PaymentMethods/PaymentMethods';
import PaymentReview from '../../../components/PaymentComponents/PaymentReview/PaymentReview';

function Payment() {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.currentUser);
  const { cartItems } = useSelector((state) => state.cart);
  const { deliveryInfo } = useSelector((state) => state.delivery);
  const { checkoutInfo } = useSelector((state) => state.checkout);

  const [payment, setPayment] = useState(checkoutInfo.paymentMethod || '');
  const [sender, setSender] = useState(checkoutInfo.sender);
  const [message, setMessage] = useState(checkoutInfo.message || '');
  const [note, setNote] = useState(checkoutInfo.note || '');
  const [useCard, setUseCard] = useState(checkoutInfo.useCard || false);
  const [card, setCard] = useState(checkoutInfo.card || {});

  useEffect(() => {
    window.scroll(0, 0);

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

      <div className='payment__panel'>
        <PaymentMethods
          value={payment}
          onChange={(value) => setPayment(value)}
        />
        <AdditionalInfo
          sender={sender}
          message={message}
          note={note}
          useCard={useCard}
          card={card}
          setSender={setSender}
          setMessage={setMessage}
          setNote={setNote}
          setUseCard={setUseCard}
          setCard={setCard}
        />

        <PaymentReview useCard={useCard} card={card} paymentMethod={payment} />
      </div>
    </div>
  );
}

export default Payment;
