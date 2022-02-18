import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../../../components/CartItem/CartItem';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { currencyFormat } from '../../../utilities/helpers';

function Cart() {
  const cart = useSelector((state) => state.cart);
  // const { recipientAddress } = cart;
  // const { userInfo } = useSelector((state) => state.currentUser);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.cartItems.forEach(
      (item) => (totalPrice += item.product.price * item.quantity)
    );
    return totalPrice;
  };

  const calculateTotalProducts = () => {
    let totalProduct = 0;
    cart.cartItems.forEach((item) => (totalProduct += item.quantity));
    return totalProduct;
  };

  const recipientInfoHandler = () => {};

  return (
    <main className='container cart__panel flex'>
      <div className='cart__list'>
        <h2>Your Cart</h2>
        <div className='divider'></div>
        {cart.cartItems.length > 0 ? (
          cart.cartItems.map((item, index) => (
            <div key={index}>
              <CartItem data={item} />
              {index !== cart.cartItems.length - 1 && (
                <div className='divider'></div>
              )}
            </div>
          ))
        ) : (
          <div className='cart__info'>
            <MessageBox>There are no products in your cart</MessageBox>
            <Link to='/product' className='btn btn-primary'>
              Go Shopping Now
            </Link>
          </div>
        )}
      </div>

      <div className='cart__checkout flex col col-3'>
        <h2>Order Information</h2>
        <div className='divider'></div>
        <div className='cart__quantity flex'>
          <span style={{ fontWeight: 'bold' }}>Total products</span>
          <span style={{ fontStyle: 'italic' }}>
            {calculateTotalProducts()} products
          </span>
        </div>
        <div className='cart__total flex'>
          <span style={{ fontWeight: 'bold' }}>Total</span>
          <span className='cart__total-price product-price'>
            {currencyFormat.format(calculateTotalPrice())}
          </span>
        </div>
        <div className='divider'></div>
        {cart.cartItems.length === 0 ? (
          <button
            type='button'
            className='btn btn-disable'
            onClick={recipientInfoHandler}
            disabled
          >
            Order
          </button>
        ) : (
          <button
            type='button'
            className='btn btn-cta'
            onClick={recipientInfoHandler}
          >
            Order
          </button>
        )}
      </div>
    </main>
  );
}

export default Cart;
