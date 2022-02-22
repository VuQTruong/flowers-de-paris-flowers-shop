import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from '../../../config/axios';
import swal from 'sweetalert2';
import { dateFormat } from '../../../utilities/helpers';

function PaymentButton({ paymentMethod }) {
  const paypal = useRef();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const { userInfo } = useSelector((state) => state.currentUser);
  const { cartItems } = useSelector((state) => state.cart);
  const { deliveryInfo } = useSelector((state) => state.delivery);
  const checkoutInfo = JSON.parse(sessionStorage.getItem('checkoutInfo'));

  useEffect(() => {
    const addPaypalScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&components=buttons,funding-eligibility&currency=CAD`;
      script.async = true;
      script.dataset.namespace = 'paypal_sdk';
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    const getItems = () => {
      return cartItems.map((item) => {
        return {
          id: item.product._id,
          quantity: item.quantity,
        };
      });
    };

    const createOrderHandler = async () => {
      try {
        const items = getItems();
        const card = (checkoutInfo && checkoutInfo.card) || null;

        const { data } = await Axios.post('/payments/paypal', {
          items,
          card,
        });
        return data.data.id;
      } catch (error) {
        swal.fire({
          icon: 'error',
          title: 'Oops!...',
          text: 'Sorry! Something wrong happened. Please try again later!',
        });
      }
    };

    const onApproveHandler = async (data, actions) => {
      return await actions.order.capture().then((details) => {
        swal
          .fire({
            icon: 'success',
            title: 'Woo hoo!...',
            text: `The order has been paid successfully by ${details.payer.name.given_name}`,
          })
          .then(() => {
            placeOrderHandler(true, dateFormat.format(details.createdAt));
          });
      });
    };

    // ?check if the paypal_sdk is loaded or not
    if (!window.paypal_skd && !sdkReady) {
      addPaypalScript();
    }

    if (sdkReady) {
      // ?payment method: credit or debit
      if (paymentMethod === 'credit') {
        const button = window.paypal_sdk.Buttons({
          fundingSource: window.paypal_sdk.FUNDING.CARD,
          createOrder: createOrderHandler,
          onApprove: onApproveHandler,
        });

        paypal.current.innerHTML = '';
        button.render(paypal.current);
      }

      // ? payment method: paypal
      if (paymentMethod === 'paypal') {
        const button = window.paypal_sdk.Buttons({
          fundingSource: window.paypal_sdk.FUNDING.PAYPAL,
          createOrder: createOrderHandler,
          onApprove: onApproveHandler,
        });

        paypal.current.innerHTML = '';
        button.render(paypal.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, sdkReady]);

  const placeOrderHandler = async (isPaid = false, paidAt = null) => {
    // !if user choose to pay by cash on delivery
    // !force the user to update and confirm phone number before proceeding
    if (paymentMethod === 'cash' && !userInfo.phone) {
      swal
        .fire({
          icon: 'info',
          title: '',
          text: 'Please update and confirm your phone number before proceeding',
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: `Let's do it`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            navigate('/user/info');
          }
        });

      return;
    }

    // !prepare order information
    let price = 0;
    const orderItems = cartItems.map((item) => {
      price += item.product.price * item.quantity;

      return {
        productId: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        image: item.product.coverImage,
        price: item.product.price,
      };
    });

    let totalPrice = price;
    if (checkoutInfo && checkoutInfo.card) {
      totalPrice += 5;
    }

    const orderInfo = {
      orderItems,
      deliveryInfo,
      sender: checkoutInfo && checkoutInfo.sender,
      message: checkoutInfo && checkoutInfo.message,
      note: checkoutInfo && checkoutInfo.note,
      card: (checkoutInfo && checkoutInfo.card) || '',
      paymentMethod,
      price,
      shippingPrice: 0,
      totalPrice,
      isPaid,
      paidAt: isPaid ? paidAt : null,
    };

    // !clear checkout info in sessionStorage

    // !send request to create a new order in the database
    try {
      const { data } = await Axios.post('/orders', orderInfo);

      console.log(data.data);
    } catch (error) {
      console.log(error);
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response,
      });
    }
  };

  return paymentMethod === '' ? (
    <button className='btn' disabled={true} style={{ width: '100%' }}>
      Please select a payment method
    </button>
  ) : paymentMethod === 'cash' ? (
    <button className='btn btn-cta btn-payment' onClick={placeOrderHandler}>
      Checkout
    </button>
  ) : (
    <div ref={paypal}></div>
  );
}

export default PaymentButton;
