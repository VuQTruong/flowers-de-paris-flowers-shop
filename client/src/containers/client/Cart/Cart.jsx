import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../../../components/CartItem/CartItem';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { getCart } from '../../../features/cart/get-cart';
import { currencyFormat } from '../../../utilities/helpers';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { deliveryInfo } = useSelector((state) => state.delivery);
  const { userInfo } = useSelector((state) => state.currentUser);

  useEffect(() => {
    window.scroll(0, 0);
    if (userInfo) {
      dispatch(getCart());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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

  const deliveryInfoHandler = () => {
    if (!userInfo) {
      navigate('/signin?redirect=delivery');
    } else {
      if (!deliveryInfo) {
        navigate('/delivery');
      } else {
        navigate('/payment');
      }
    }
  };

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
            <Link to='/products' className='btn btn-primary'>
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
            onClick={deliveryInfoHandler}
            disabled
          >
            Order
          </button>
        ) : (
          <button
            type='button'
            className='btn btn-cta'
            onClick={deliveryInfoHandler}
          >
            Order
          </button>
        )}
      </div>
    </main>
  );
}

export default Cart;
