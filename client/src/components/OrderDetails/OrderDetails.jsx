import React from 'react';
import MessageBox from '../MessageBox/MessageBox';
import { Link } from 'react-router-dom';
import { ReactComponent as DefaultPhotoSVG } from '../../assets/svgs/undraw_photos_re_pvh3.svg';
import { currencyFormat, dateFormat } from '../../utilities/helpers';

function OrderDetails({ order, hideShoppingBtn }) {
  return (
    <React.Fragment>
      <div className='order-details__order-info'>
        <h3 className='order-details__order-id'>Order#: {order.orderId}</h3>
        <h3
          className='order-details__status'
          style={{
            '--status-color': `${
              order.status === 'Pending'
                ? '#f0ad4e'
                : order.status === 'Delivered'
                ? '#6bc839'
                : order.status === 'Cancelled' && '#d9534f'
            }`,
          }}
        >
          {order.status}
        </h3>
      </div>

      <section className='order-details__panel'>
        <section className='order-details__details'>
          <section className='order-details__delivery'>
            <h3 className='order-details__label'>Delivery Information</h3>

            <h3 className='order-details__sub-label'>Recipient</h3>
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
              {order.deliveryInfo.city.name}, {order.deliveryInfo.province.name}
              , {order.deliveryInfo.country.name}{' '}
              {order.deliveryInfo.postalCode
                ? `, ${order.deliveryInfo.postalCode}`
                : ''}
            </p>

            <div className='divider'></div>

            <h3 className='order-details__sub-label'>Sender</h3>
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
                className='order-details__notification'
                fullWidth
              >
                Delivered
              </MessageBox>
            ) : (
              <MessageBox
                variant='danger'
                className='order-details__notification'
                fullWidth
              >
                Not delivered
              </MessageBox>
            )}
          </section>

          <section className='order-details__order-items'>
            <h3 className='order-details__label'>Order Items</h3>

            <ul className='order-details__items-list'>
              {order.orderItems.map((item) => {
                return (
                  <li className='order-details__item' key={item.productId}>
                    <div className='order-details__item-general-info'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='order-details__item-img'
                      />
                      <Link
                        to={`/products/${item.categorySlug}/${item.slug}`}
                        className='order-details__item-name'
                      >
                        {item.name}
                      </Link>
                    </div>

                    <div className='order-details__item-price'>
                      <p className='order-details__price'>
                        {item.quantity} x {currencyFormat.format(item.price)} ={' '}
                        {currencyFormat.format(item.quantity * item.price)}
                      </p>
                    </div>
                  </li>
                );
              })}
              {order.card && (
                <li className='order-details__item' key={order.card.name}>
                  <div className='order-details__item-general-info'>
                    <DefaultPhotoSVG className='order-details__item-img' />
                    {/* <i className='bx bx-image'></i> */}
                    <p className='order-details__item-name'>
                      {order.card.name}
                    </p>
                  </div>

                  <div className='order-details__item-price'>
                    <p className='order-details__price'>
                      1 x {currencyFormat.format(order.card.price)} ={' '}
                      {currencyFormat.format(1 * order.card.price)}
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </section>
        </section>

        <section className='order-details__payment-info'>
          <section className='order-details__payment'>
            <h3 className='order-details__label'>Payment Method</h3>
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
                className='order-details__notification'
                fullWidth
              >
                Paid on {dateFormat.format(Date.parse(order.paidAt))}
              </MessageBox>
            ) : (
              <MessageBox
                variant='danger'
                className='order-details__notification'
                fullWidth
              >
                Not Paid
              </MessageBox>
            )}
          </section>

          <section className='order-details__summary'>
            <h3 className='order-details__label'>Order Summary</h3>
            <p className='order-details__summary-item'>
              <span className='order-details__summary-item-label'>Items</span>
              <span className='order-details__price order-details__value'>
                {currencyFormat.format(order.totalPrice)}
              </span>
            </p>
            <p className='order-details__summary-item'>
              <span className='order-details__summary-item-label'>
                Shipping
              </span>
              <span className='order-details__price order-details__value'>
                {currencyFormat.format(0)}
              </span>
            </p>
            <p className='order-details__summary-item'>
              <span className='order-details__summary-item-label'>
                <strong>Total</strong>
              </span>
              <span className='order-details__price order-details__value'>
                {currencyFormat.format(order.totalPrice + 0)}
              </span>
            </p>
          </section>

          {!hideShoppingBtn && (
            <Link to='/products' className='btn btn-primary order-details__btn'>
              Keep Shopping
            </Link>
          )}
        </section>
      </section>
    </React.Fragment>
  );
}

export default OrderDetails;
