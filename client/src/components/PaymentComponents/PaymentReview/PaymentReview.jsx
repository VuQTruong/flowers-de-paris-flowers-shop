import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { currencyFormat } from '../../../utilities/helpers';
import PaymentButton from '../PaymentButton/PaymentButton';

function PaymentReview(props) {
  const { useCard, card, paymentMethod } = props;

  const navigate = useNavigate();
  const [showItems, setShowItems] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { deliveryInfo } = useSelector((state) => state.delivery);

  const editDeliveryInfoHandler = () => {
    navigate('/delivery');
  };

  const editCartHandler = () => {
    navigate('/cart');
  };

  const calculateTotalProducts = () => {
    let totalProduct = 0;
    cartItems.forEach((item) => (totalProduct += item.quantity));

    if (useCard && card !== {}) {
      totalProduct += 1;
    }

    return totalProduct;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(
      (item) => (totalPrice += item.product.price * item.quantity)
    );

    if (useCard && card !== {}) {
      totalPrice += card.price;
    }

    return totalPrice;
  };

  return (
    <div className='checkout-info'>
      <div className='checkout-info__section'>
        <div className='checkout-info__header flex'>
          <span style={{ fontWeight: 'bold' }}>Delivery Information</span>
          <button
            className='btn btn-primary btn-edit'
            onClick={editDeliveryInfoHandler}
          >
            Edit
          </button>
        </div>
        <div className='checkout-info__content'>
          {deliveryInfo && (
            <div>
              <h3>{deliveryInfo.name}</h3>
              <p>
                {deliveryInfo.address},{' '}
                {deliveryInfo.ward ? `${deliveryInfo.ward.name},` : ''}{' '}
                {deliveryInfo.city.name}, {deliveryInfo.province.name},{' '}
                {deliveryInfo.country.name}{' '}
                {deliveryInfo.postalCode ? `, ${deliveryInfo.postalCode}` : ''}
              </p>
              <p>Phone Number: {deliveryInfo.phone}</p>
            </div>
          )}
        </div>
      </div>

      <div className='checkout-info__section'>
        <div className='checkout-info__header flex'>
          <span style={{ fontWeight: 'bold' }}>Your Order</span>
          <button
            className='btn btn-primary btn-edit'
            onClick={editCartHandler}
          >
            Edit
          </button>
        </div>

        <div className='checkout-items flex'>
          <span>
            {calculateTotalProducts()}{' '}
            {calculateTotalProducts() > 1 ? 'products' : 'product'}
          </span>
          <div
            className='checkout-items__show-details flex'
            onClick={() => setShowItems(!showItems)}
          >
            {showItems ? 'Collapse' : 'Details'}
            <i
              className={`bx bx-caret-down checkout-items__caret ${
                showItems ? 'active' : ''
              }`}
            ></i>
          </div>
        </div>

        <div
          className={`accordion box checkout-items__details ${
            showItems ? 'active' : ''
          }`}
        >
          {cartItems.map((item) => (
            <div className='item-details' key={item.product._id}>
              <Link
                to={`/products/${item.product.categorySlug}/${item.product.slug}`}
                target='_blank'
                className='item-details__name'
              >
                {item.product.name}
              </Link>
              <span className='item-details__qty'>x{item.quantity}</span>
              <span className='item-details__price'>
                {currencyFormat.format(item.product.price * item.quantity)}
              </span>
            </div>
          ))}

          {useCard && card !== {} && (
            <div className='item-details'>
              <span className='item-details__name'>{card.name}</span>
              <span className='item-details__qty'>x1</span>
              <span className='item-details__price'>
                {currencyFormat.format(card.price)}
              </span>
            </div>
          )}
        </div>

        <div className='checkout-info__content'>
          <div className='checkout-info__item flex'>
            <span>Sub Total</span>
            <span>{currencyFormat.format(calculateTotalPrice())}</span>
          </div>
          <div className='checkout-info__item flex'>
            <span>Delivery Fee</span>
            <span>{currencyFormat.format(0)}</span>
          </div>
        </div>
        <div className='checkout-info__footer'>
          <div className='checkout-info__item flex'>
            <span style={{ fontWeight: 'bold' }}>Total</span>
            <span className='product-price checkout-price'>
              {currencyFormat.format(calculateTotalPrice())}
            </span>
          </div>
        </div>
      </div>

      <div className='checkout-info__section'>
        <PaymentButton paymentMethod={paymentMethod} />
        <p style={{ fontSize: '.875rem', fontStyle: 'italic' }}>
          (Please check your order before proceeding to payment)
        </p>
      </div>
    </div>
  );
}

export default PaymentReview;
