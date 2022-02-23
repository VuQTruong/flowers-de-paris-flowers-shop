import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Axios from '../../../config/axios';

import { ReactComponent as DefaultPhotoSVG } from '../../../assets/svgs/undraw_photos_re_pvh3.svg';
import { currencyFormat, dateFormat } from '../../../utilities/helpers';
import swal from 'sweetalert2';

function ConfirmOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.currentUser);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await Axios.get(`/orders/${orderId}`);

        setOrder(data.data.order);
      } catch (error) {
        swal
          .fire({
            icon: 'info',
            title: 'Uh oh!...',
            text: error.response.data.message,
          })
          .then(() => {
            navigate('/user/orders');
          });
        setError(error.response.data.message);
      }

      setLoading(false);
    };

    if (!userInfo) {
      swal
        .fire({
          icon: 'warning',
          title: 'Oops!...',
          text: 'Please sign in to access this page',
        })
        .then(() => {
          navigate(`/signin?redirect=orders/${orderId}`);
        });
    } else {
      fetchOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, userInfo]);

  return (
    <main className='container order-confirm__container'>
      {(loading || error) && <Loading />}
      {order && !error && (
        <React.Fragment>
          <h2 className='order-confirm__title'>Order confirmation</h2>

          <div className='order-confirm__order-info'>
            <h3 className='order-confirm__order-id'>Order#: {order.orderId}</h3>
            <h3
              className='order-confirm__status'
              style={{
                '--status-color': `${
                  order.status === 'Pending'
                    ? '#f0ad4e'
                    : order.status === 'Delivered'
                    ? '#6bc839'
                    : order.status === 'Cancel' && '#d9534f'
                }`,
              }}
            >
              {order.status}
            </h3>
          </div>

          <section className='order-confirm__panel'>
            <section className='order-confirm__details'>
              <section className='order-confirm__delivery'>
                <h3 className='order-confirm__label'>Delivery Information</h3>

                <h3 className='order-confirm__sub-label'>Recipient</h3>
                <p>
                  <strong>Name:</strong> {order.deliveryInfo.name}
                </p>
                {order.deliveryInfo.phone && (
                  <p>
                    <strong>Phone Number:</strong> {order.deliveryInfo.phone}
                  </p>
                )}
                <p>
                  <strong>Address:</strong> {order.deliveryInfo.address},{' '}
                  {order.deliveryInfo.ward
                    ? `${order.deliveryInfo.ward.name},`
                    : ''}{' '}
                  {order.deliveryInfo.city.name},{' '}
                  {order.deliveryInfo.province.name},{' '}
                  {order.deliveryInfo.country.name}{' '}
                  {order.deliveryInfo.postalCode
                    ? `, ${order.deliveryInfo.postalCode}`
                    : ''}
                </p>

                <div className='divider'></div>

                <h3 className='order-confirm__sub-label'>Sender</h3>
                <p>
                  <strong>Name:</strong> {order.sender}
                </p>
                <p>
                  <strong>Message:</strong> {order.message}
                </p>
                <p>
                  <strong>Notes:</strong> {order.note}
                </p>

                {order.isDelivered ? (
                  <MessageBox
                    variant='success'
                    className='order-confirm__notification'
                    fullWidth
                  >
                    Delivered
                  </MessageBox>
                ) : (
                  <MessageBox
                    variant='danger'
                    className='order-confirm__notification'
                    fullWidth
                  >
                    Not delivered
                  </MessageBox>
                )}
              </section>

              <section className='order-confirm__order-items'>
                <h3 className='order-confirm__label'>Order Items</h3>

                <ul className='order-confirm__items-list'>
                  {order.orderItems.map((item) => {
                    return (
                      <li className='order-confirm__item' key={item.productId}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='order-confirm__item-img'
                        />
                        <Link
                          to={`/products/${item.categorySlug}/${item.slug}`}
                          className='order-confirm__item-name'
                        >
                          {item.name}
                        </Link>
                        <p className='order-confirm__price'>
                          {item.quantity} x {currencyFormat.format(item.price)}{' '}
                          = {currencyFormat.format(item.quantity * item.price)}
                        </p>
                      </li>
                    );
                  })}
                  {order.card && (
                    <li className='order-confirm__item' key={order.card.name}>
                      <DefaultPhotoSVG className='order-confirm__item-img' />
                      <p className='order-confirm__item-name'>
                        {order.card.name}
                      </p>
                      <p className='order-confirm__price'>
                        1 x {currencyFormat.format(order.card.price)} ={' '}
                        {currencyFormat.format(1 * order.card.price)}
                      </p>
                    </li>
                  )}
                </ul>
              </section>
            </section>

            <section className='order-confirm__payment-info'>
              <section className='order-confirm__payment'>
                <h3 className='order-confirm__label'>Payment Method</h3>
                <p>
                  Method:{' '}
                  {order.paymentMethod === 'paypal'
                    ? 'PayPal'
                    : order.paymentMethod === 'credit'
                    ? 'Credit/Debit Card'
                    : order.paymentMethod === 'cash' && 'Cash on Delivery'}
                </p>

                {order.isPaid ? (
                  <MessageBox
                    variant='success'
                    className='order-confirm__notification'
                    fullWidth
                  >
                    Paid on {dateFormat.format(Date.parse(order.paidAt))}
                  </MessageBox>
                ) : (
                  <MessageBox
                    variant='danger'
                    className='order-confirm__notification'
                    fullWidth
                  >
                    Not Paid
                  </MessageBox>
                )}
              </section>

              <section className='order-confirm__summary'>
                <h3 className='order-confirm__label'>Order Summary</h3>
                <p className='order-confirm__summary-item'>
                  <span className='order-confirm__summary-item-label'>
                    Items
                  </span>
                  <span className='order-confirm__price order-confirm__value'>
                    {currencyFormat.format(order.totalPrice)}
                  </span>
                </p>
                <p className='order-confirm__summary-item'>
                  <span className='order-confirm__summary-item-label'>
                    Shipping
                  </span>
                  <span className='order-confirm__price order-confirm__value'>
                    {currencyFormat.format(0)}
                  </span>
                </p>
                <p className='order-confirm__summary-item'>
                  <span className='order-confirm__summary-item-label'>
                    <strong>Total</strong>
                  </span>
                  <span className='order-confirm__price order-confirm__value'>
                    {currencyFormat.format(order.totalPrice + 0)}
                  </span>
                </p>
              </section>

              <Link
                to='/products'
                className='btn btn-primary order-confirm__btn'
              >
                Keep Shopping
              </Link>
            </section>
          </section>
        </React.Fragment>
      )}
    </main>
  );
}

export default ConfirmOrder;
