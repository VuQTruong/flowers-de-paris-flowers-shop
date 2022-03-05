import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from '../../../config/axios';
import swal from 'sweetalert2';
import { dateFormat } from '../../../utilities/helpers';
import { clearCheckoutInfo } from '../../../features/checkout/slice/checkout-slice';
import { emptyCart } from '../../../features/cart/empty-cart';
import { PAYPAL_CLIENT_ID } from '../../../constants';

function PaymentButton({ paymentMethod }) {
  const paypal = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const { userInfo } = useSelector((state) => state.currentUser);
  const { cartItems } = useSelector((state) => state.cart);
  const { deliveryInfo } = useSelector((state) => state.delivery);
  const { checkoutInfo } = useSelector((state) => state.checkout);

  useEffect(() => {
    const addPaypalScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=buttons,funding-eligibility&currency=CAD`;
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
        const card = checkoutInfo.card || {};

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
  }, [paymentMethod, sdkReady, checkoutInfo.card]);

  const placeOrderHandler = async (isPaid, paidAt) => {
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
        slug: item.product.slug,
        categorySlug: item.product.categorySlug,
        quantity: item.quantity,
        image: item.product.coverImage,
        price: item.product.price,
      };
    });

    let totalPrice = price;
    if (checkoutInfo.card) {
      totalPrice += checkoutInfo.card.price;
    }

    const orderInfo = {
      orderItems,
      deliveryInfo,
      sender: checkoutInfo.sender || '',
      message: checkoutInfo.message || '',
      note: checkoutInfo.note || '',
      card: checkoutInfo.card || {},
      paymentMethod,
      price,
      shippingPrice: 0,
      totalPrice,
      isPaid,
      paidAt,
    };

    // !send request to create a new order in the database
    try {
      swal.fire({
        title: `We're working on your order`,
        allowOutsideClick: false,
        didOpen: () => {
          swal.showLoading();
        },
      });

      const { data } = await Axios.post('/orders', orderInfo);
      const order = data.data.order;

      swal.close();
      swal
        .fire({
          icon: 'success',
          title: 'Huray!...',
          text: `Your beautiful flowers will reach your beloved as fast as the lightning ❤`,
        })
        .then(() => {
          // !clear checkout info in sessionStorage
          dispatch(clearCheckoutInfo());

          // !empty the cart
          dispatch(emptyCart());

          navigate(`/orders/${order.orderId}`, { replace: true });
        });
    } catch (error) {
      console.log(error);
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: 'Sorry! Something wrong happened. Please try again later!',
      });
    }
  };

  return paymentMethod === '' ? (
    <button className='btn' disabled={true} style={{ width: '100%' }}>
      Please select a payment method
    </button>
  ) : paymentMethod === 'cash' ? (
    <button
      className='btn btn-cta btn-payment'
      onClick={() => placeOrderHandler(false, '')}
    >
      Checkout
    </button>
  ) : (
    <div ref={paypal}></div>
  );
}

export default PaymentButton;
